const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
/* Definging postgressSQL module */
const pg = require('pg');
/* Definging configuration of database config */
const config = require('./../config/configuration');
/* Defining connectionstring for the database */
const connectionString = process.env.DATABASE_URL || config.connectionUrl;


const service  	= require('./../library/dbLibrary');
const dateService = require('./../library/dates');
const authService = require('./../library/authentication');

//Just for development


/* function register for registering new users */
router.post('/register', (req, res, next) => {
	"use strict";
	console.log(req.body);
	/* USERNAME should be lowerCASE! to ensure we get unique names at all times. */
	let resUser = [req.body.username];
	/* Defining and looking for user with username before I can add to database.*/
	let table = 'users';
	let string = 'select * from ' + table +' WHERE username = ($1)';
	//Calling for that user if exist it prompt the result else insert into database. 
	service.queryStringValue(string, resUser, 
		(err, result) => {
			if (result.length < 1) {
				authService.register(req, (err, results) => {
					if(err) {
						return res.status(400).json({message: 'Error running query'});
					}
					if (!results) {
						return res.status(400).json({message: 'Error adding user.'});
					} else {
						return res.status(200).json({message: 'User added succesfully.'});
					}
				});
			} else {
				// User was found, returning to user for his knowladge
				return res.status(400).json({message: 'Username already exists.'});	
			}
		}
	);
});

/* function login checks if username is in the database and then authenticates password */
router.post('/login', (req, res, next) => {
	"use strict";
	if (!req.body.username || !req.body.password) {
		console.log(req.body);
		return res.status(400).json({message: 'Please fill out all fields!'});
	}
	let table = 'users';
	let string ='SELECT * FROM '+ table + ' WHERE UPPER(username) = UPPER($1)';
	let value = [req.body.username];
	service.queryStringValue(string, value, (err, result) => {
		if (err) {
			return res.status(400).json({message: 'Error running query to '+ table});
		} else {
			if (result[0] !== undefined) {
				// Check password agains salt
				authService.validPassword(req.body.password, result[0], (callBack) => {
					if (callBack) {
						return res.status(200).json({token: authService.generateJWT(result[0])});
					} else {
						return res.status(422).json({message: 'Incorrect password'});
					}
				});
			} else {
				return res.status(550).json({message: 'No such user.'});
			}
		}
	});
});

/* Sends e-mail to user if requested of forgotten password with token */
router.post('/forgotPassword', (req, res, next) => {
	"use strict";
	if (!req.body.email) {
		return res.status(400).json({message: 'Please fill out your email!'});
	}
	let table = 'users';
	let string ='SELECT * FROM '+ table + ' WHERE email = ($1)';
	let value = [req.body.email];

	service.queryStringValue(string, value, (err, result) => {
		if (err) {
			return res.status(400).json({message: 'Error running query to '+ table});
		} else {
			let objectResult = result[0];
			if (objectResult.email === req.body.email) {

				let newToken = {
					token 	 	: authService.generateResetJWT(objectResult),
					tokenExpire : dateService.dateAddMin(60)
				};

				let stringUpdate = 'UPDATE users SET resettoken = ($1), tokenexpired = ($2) WHERE id = ($3)';
				let valueUpdate = [newToken.token, newToken.tokenExpire, objectResult.id];
				
				service.queryStringValue(stringUpdate, valueUpdate, (err, result) => {
					if (err) {
						return res.status(400).json({message: 'Error running query'});
					} else {
						authService.sendResetPassEmail(objectResult, newToken, req, (err) => {
							if (err) {
								return res.status(400).json({message: 'Error when sending mail.'});
							} 
						});
						return res.status(200).json({message: 'E-mail sent to user'});
					}
				});

			} else {	
				return res.status(404).json({message: 'No such email, contact administrator'});
			}
		}
	});
});	

/* Get token from users after e-mail was sent to check if the right user, then okei to reset password */
router.post('/reset/:token', (req, res, next) => {
	"use strict";
	let token = req.params.token;
	if (!token) {
		return res.status(400).json({message: 'Please provide token'});
	}
	if (!req.body.password || !req.body.confirmPassword) {
		return res.status(400).json({message: 'Please fill out both password fields.'});
	}
	if (req.body.password === req.body.confirmPassword) {
		let results = {};
		pg.connect(connectionString, (err, client, done) => {
			if (err) {
				done(err);
				return res.status(400).json({message: 'error fetching client from pool'});
			}

			/* SQL Query, select data */
			let query = client.query('SELECT * FROM users WHERE reset_token = ($1)', [token],
				(err, result) => {
					done();
				}
			);

			/* Stream results back */ 
			query.on('row', (row) => {
				results = {
					id 		 	: row.id,
					username 	: row.username,
					email 	 	: row.email,
					name 	 	: row.name,
					tokenExpire : row.tokenexpired,
					token 		: row.resettoken,
					password 	: req.body.password
				};
			});

			/* close connection */
			query.on('end', () => {		
				let today = dateService.dateAddMin(0);

				if (err) {
					done();
					return res.status(400).json({message: 'Error running query'});
				} else {
					if (results.token === token) {
						if (today <= results.tokenExpire) {
							
							authService.setPassword(results, (err, check) => {
								done();
								if(err) {
									return res.status(400).json({message: 'Error running query'});
								}
								if(check){
									authService.confirmPassReset(results, req);
									return res.status(200).json({message: 'Confirmation E-mail sent to user about password is updated.'});
								} else {
									return res.status(400).json({message: 'Something went wrong.'});
								}
							});
						} else {
							done();
							return res.status(404).json({message: 'Token has expired.'});
						}
					} else {
						done();
						return res.status(404).json({message: 'Invalid token'});
					}
				}	
			});
		});
	} else {
		return res.status(400).json({message: 'Password did not match.'});
	} 
});


module.exports = router;