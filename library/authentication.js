

//let exports = module.exports = {};
/* Declare of bcrypt model, it is for salt and hasing information. Security model. */
const bcrypt = require('bcryptjs');


/* Declare nodemailer  to send emails */
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
/*
 Declare of jwt (Json web token), used for client and server for authanticating user 
 This is done for security feature.. other method that can be used = sessions.
*/
const jwt = require('jsonwebtoken');
//let jwts = require('jwt-simple');
/* Getting secrets config file. */
const config = require('../config/configuration');
const email = require('./../config/mailOption');
const service = require('./../library/dbLibrary');


/* register new user */
exports.register = (req, cb) => {
	"use strict";
	bcrypt.genSalt(10, (err, salt) => {
	    bcrypt.hash(req.body.password, salt, (err, hash) => {
			let stringAdd = 'INSERT INTO users (username, name, email, hash, resettoken, tokenexpired, admin, phone, address, moderator, active)';
				stringAdd +='  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *';
				// Defining values to insert 
				let value = [req.body.username, req.body.name, 
							req.body.email, hash, null, null,
							false, null, null, false, true];
				// Calling postService to add values with string constrains 
			service.queryStringValue(stringAdd, value, (err, results) => {
					if (err) 
						return cb(err, false);
					if (results) {
						return cb(false, true);
					} else {
						return cb(false, false);
					}
				}
			);
   		});
	});	
};

/* setPassword for user */
exports.setPassword = (object, cb) => {
	"use strict";
	//console.log(password);
	bcrypt.genSalt(10, (err, salt) => {
	    bcrypt.hash(object.password, salt, (err, hash) => {							
			let stringAdd 	= 'UPDATE users SET resettoken = ($1), tokenexpired = ($2), hash = ($3) WHERE id = ($4) '; 
			let value 		= [null, null, hash, object.id]; 
			service.queryStringValue(stringAdd, value, (err, results) => {
					if (err)
						return cb(err, false);
					if (results) {
						return cb(false, true);
					} else {
						return cb(false, false);
					}
				}
			);
   		});
	});	
};


/* Validating the password of user. */
exports.validPassword = (password, object, cb) => {
	"use strict";
	//console.log(object);
	bcrypt.compare(password, object.hash, (err, res) => {
    	return cb(res);
	});
};

/* Change password if user needs to change it for any reson. */
exports.changePassword = (object) => {
	"use strict";
	/* Set new object with right information */
	let checkobject = {
		hash : object.hash
	};
	/* validate if everything is okei */
	if (validPassword(object.oldPassword, checkobject)) {
		/* Get new hash and salt */
		let setPass = setPassword(object.newPassword);
		/* Populate return object with new data. (new salt and hash) */
		let returnObject = {
			username: object.username,
			hash 	: setPass
		};	
		return returnObject;
	} 
	else {
		/* We have an error */
		return null;
	}
};

/* 
 Generating json web token for user.. exp = expire, returns token
 with id, usernamem scope and when it expires +
*/
exports.generateJWT = (object) => {
	"use strict";
	/* Set expirateion to 4 days. */
	let today = new Date();
	let exp = new Date(today);
	exp.setDate(today.getDate() + 4);
	let scopes = [];

		
	scopes.push('user');
	if (object.admin)
		scopes.push('admin');


	/* Sign the token and return it. */
	return jwt.sign({
		/* 
		 Payload, here we can set what ever we want to send with
		 the token and use for what ever we want. Pease do not send
		 password or other sensitive information.
		*/
		id 		: object.id,
		username: object.username,
		name 	: object.name,	
		isadmin	: object.admin,
		scopes  : scopes,

		exp 	: parseInt(exp.getTime() /1000)
	}, 
	config.secret);
};

/* Just used to reset password and store this token */
exports.generateResetJWT = (object) => {
	"use strict";
	/* Set expirateion to 1 hour. */
	let expTime = Date.now() + 3600000; 

	return jwt.sign({
		/* 
		 Payload, here we can set what ever we want to send with
		 the token and use for what ever we want. Pease do not send
		 password or other sensitive information.
		*/
		id: object.id,
		username: object.username,
		exp: expTime
	}, 
	config.secret);
};

exports.decodeJWT = (req) => {
	"use strict";
	//console.log('header i helper ' + req.headers.authorization);
	let token = req.headers.authorization;
	let token2 = token.substring(7);
	//console.log("token 2 " + token2);
	let decoded = jwt.verify(token2, config.secret);
	//console.log("decode i helper " + decoded.id + ' ' + decoded.username);
	return decoded;
};



/* After generate token this is used to send e-mail to user with token. */
exports.sendResetPassEmail = (user, token, req) => {
	"use strict";
	/* Defining the transporter to send email with configureation */
	let transporter = nodemailer.createTransport(smtpTransport({
		    host: email.smtpHost,
		    port: email.smtpPort,
	   		auth: {
	       		user: email.emailUser,
	       		pass: email.emailPass
	    	}
		}));
	/* Structor for the e-mail to be sent. */
	let mailOptions = {
		to: user.email,
		from: email.emailUser,
		subject: ''+email.emailSubject + user.name + email.projectName+'',
		text: ''+email.greeting + user.name + email.contentMailToken +
			email.http + req.headers.host + email.injectUrl + token.token + ' \n\n' + email.regards +''
	};
	/* Sending e-mail to user, error checking or send. */
	transporter.sendMail(mailOptions, (err, res) => {
		if (err) {
			return err;
		} else {
			return true;
		}
	});
};

/* Same as other above, however this is only sent to confirm that everything went well or not. */
exports.confirmPassReset = (user, req) => {
	"use strict";
	let transporter = nodemailer.createTransport(smtpTransport({
		    host: email.smtpHost,
		    port: email.smtpPort,
	   		auth: {
	       		user: email.emailUser,
	       		pass: email.emailPass
	    	}
		})
	);
	let mailOptions = {
		to: user.email,
		from: config.emailUser,
		subject: '' + email.emailSubject + user.name + email.projectName +'',
		text: '' + email.greeting + user.name + email.contentMailReportChangePass + email.regards +''
	};
	transporter.sendMail(mailOptions, (err, res) => { 
		if (err) {
			return err;
		} else {
			return true;
		}
	});	
}; 


