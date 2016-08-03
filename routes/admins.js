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
	var check = _.toNumber(req.body.userId);

	if (_.isNumber(check)){
		return res.status(200).json({message: 'it is a number : '+check});
	}
	else {
		return res.status(400).json({message: 'Provide id of user!'});
	}

	return res.status(200).json({message: check});
});
router.put('/deactivate/:uid', (req, res, next) => {
	"use strict";
});
router.put('/make/admin/:uid', (req, res, next) => {
	"use strict";
});
router.put('/remove/admin/:uid', (req, res, next) => {
	"use strict";
});

router.put('/make/moderator/:uid', (req, res, next) => {
	"use strict";
});
router.put('/remove/moderator/:uid', (req, res, next) => {
	"use strict";
});


module.exports = router;