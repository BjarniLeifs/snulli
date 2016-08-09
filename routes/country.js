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

router.get('/all',  (req, res, next) => {
	"use strict";
	let table = 'country';
	let string = 'SELECT * FROM ' + table;
	
	service.queryString(string, (err, result) => {
		if (result) {
			return res.status(200).json(result);
		} else {
			return res.status(400).json({message: 'Error running query to '+ table});
		}
	});
});



module.exports = router;