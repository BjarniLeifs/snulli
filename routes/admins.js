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
const authenticated = require('./../library/scopes');
const _ = require('lodash');

router.get('/users', (req, res, next) => {
	"use strict";
	let table = 'users';
	let string = 'SELECT * FROM ' + table;
	
	service.queryStringAdmin(string, (err, result) => {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
	
});

router.put('/active', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.body.userId);
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET active = ($1) WHERE id = ($2)';
	let value = [true, req.body.userId];
	console.log(check);

	if (_.isNumber(check) && !(_.isNaN(check))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'User is now active.'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	}
	else {
		return res.status(400).json({message: 'Provide id of user to activate.'});
	}
});

router.put('/deactivate', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.body.userId);
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET active = ($1) WHERE id = ($2)';
	let value = [false, check];

	if (_.isNumber(check) && !(_.isNaN(check))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'User is now deactive.'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	}
	else {
		return res.status(400).json({message: 'Provide id of user to deactivate.'});
	}
});
router.put('/make/admin', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.body.userId);
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET admin = ($1) WHERE id = ($2)';
	let value = [true, check];

	if (_.isNumber(check) && !(_.isNaN(check))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'User is now admin.'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	}
	else {
		return res.status(400).json({message: 'Provide id of user to make admin.'});
	}
});

router.put('/remove/admin', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.body.userId);
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET admin = ($1) WHERE id = ($2)';
	let value = [false, check];

	if (_.isNumber(check) && !(_.isNaN(check))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'User is now no longer admin.'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	}
	else {
		return res.status(400).json({message: 'Provide id of user to remove admin.'});
	}
});

router.put('/make/moderator', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.body.userId);
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET moderator = ($1) WHERE id = ($2)';
	let value = [true, check];
	console.log(req.payload);
	if (_.isNumber(check) && !(_.isNaN(check))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'User is now moderator.'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	}
	else {
		return res.status(400).json({message: 'Provide id of user to make moderator.'});
	}
});

router.put('/remove/moderator', (req, res, next) => {
	"use strict";
	let check = _.toNumber(req.body.userId);
	let table = 'users';
	let string = 'UPDATE ' +table+ ' SET moderator = ($1) WHERE id = ($2)';
	let value = [false, check];

	if (_.isNumber(check) && !(_.isNaN(check))) {
		service.queryStringValue(string, value, (err, result) => {
			if (result) {
				return res.status(200).json({message: 'User is now no longer moderator.'});
			} else {
				return res.status(400).json({message: 'Error running query to '+ table});
			} 
		});
	}
	else {
		return res.status(400).json({message: 'Provide id of user to remove moderator.'});
	}
});


module.exports = router;