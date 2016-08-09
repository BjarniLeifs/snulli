
const express = require('express');
const router = express.Router();
/* Definging postgressSQL module */
const pg = require('pg');
/* Definging configuration of database config */
const config = require('./../config/configuration');
/* Defining connectionstring for the database */
const connectionString = process.env.DATABASE_URL || config.connectionUrl;


const service  	= require('./../library/dbLibrary');
const dateService = require('./../library/dates');
const authService = require('./../library/authentication');
const authenticated = require('./../library/scopes');
const _ = require('lodash');
const isEmail = require('isemail');

/* GET users listing. */
router.get('/users',  (req, res, next) => {
	"use strict";
	let table = 'users';
	let string = 'SELECT * FROM ' + table;
	
	service.queryStringUser(string, (err, result) => {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

/* Delete user, this is only for the user himself, if not the same then nothing happens*/
router.delete('/user/:id', (req, res, next) => {
	"use strict";
	if(!req.params.id) {
		return res.status(400).json({messgae : 'You have to provide id of user'});
	}
	if (req.params.id == req.payload.id) {
		let string = 'DELETE FROM users where id = ($1)';
		let value = [req.payload.id];

		service.queryStringValue(string, value, (err, result) => {
			if (err) {
				return res.status(400).json({message: 'Error running query to '+ table});
			} else {
				return res.status(200).json({message: 'Successfully deleted user'});
			}
		});
	} else {
		return res.status(401).json({message : 'You are not authorized'});
	}
 
});

/* Delete user, this is only for the user himself, if not the same then nothing happens*/
router.delete('/user/:username', (req, res, next) => {
	"use strict";
	if(!req.params.username) {
		return res.status(400).json({messgae : 'You have to provide id of user'});
	}
	if (req.params.username == req.payload.username) {
		let string = 'DELETE FROM users where username = ($1)';
		let value = [req.payload.username];

		service.queryStringValue(string, value, (err, result) => {
			if (err) {
				return res.status(400).json({message: 'Error running query to '+ table});
			} else {
				return res.status(200).json({message: 'Successfully deleted user'});
			}
		});
	} else {
		return res.status(401).json({message : 'You are not authorized'});
	}
 
});

router.put('/update/name', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.payload.id);
	if (!check && !req.body.name){
		return res.status(400).json({message: 'Please provide a name.'});
	}

	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET name = ($1) WHERE id = ($2)';
	let value = [req.body.name, check];


	if (_.isNumber(check) && !(_.isNaN(check)) && (_.isString(req.body.name))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'Name has been updated'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	} else {
		return res.status(400).json({message: 'Provide name of user.'});
	}



});

router.put('/update/phone', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.payload.id);
	if (!check && !req.body.name){
		return res.status(400).json({message: 'Please provide a phonenumber.'});
	}
	
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET phone = ($1) WHERE id = ($2)';
	let value = [req.body.phone, check];

	if (_.isNumber(check) && !(_.isNaN(check)) && (_.isString(req.body.phone))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'Phone has been updated'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	} else {
		return res.status(400).json({message: 'Provide phonenumber for user.'});
	}
});

router.put('/update/address', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.payload.id);
	if (!check && !req.body.address){
		return res.status(400).json({message: 'Please provide a address.'});
	}
	
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET address = ($1) WHERE id = ($2)';
	let value = [req.body.address, check];

	if (_.isNumber(check) && !(_.isNaN(check)) && (_.isString(req.body.address))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'Address has been updated'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	} else {
		return res.status(400).json({message: 'Provide address for user.'});
	}
});

router.put('/update/email', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.payload.id);

	if (!check && !req.body.email){
		return res.status(400).json({message: 'Please provide a email.'});
	}
	
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET email = ($1) WHERE id = ($2)';
	let value = [req.body.email, check];

	if (isEmail.validate(req.body.email) && _.isNumber(check) && !(_.isNaN(check)) && (_.isString(req.body.email))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'Email has been updated'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	} else {
		return res.status(400).json({message: 'Provide email for user.'});
	}
});

router.get('/profile', (req, res, next) => {
	"use strict";
	console.log("test");
	let check = _.toNumber(req.payload.id);
	if (check) {
		let table = 'users';
		let string = 'Select * from ' +table+ ' where id = ($1)';
		let value = [check];
		
		service.queryStringValueUser(string, value, (err, result) => {
			if (result) {
				return res.status(200).json(result);
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	
	} else {
		return res.status(400).json({message: 'You do not have any profile.'});
	}

});



module.exports = router;
