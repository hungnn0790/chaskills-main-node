var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('../config');
var User = require('../models/user');

const createToken = name => {
	var payload = {
		sub: name,
		exp: moment().add(1, 'day').unix()
	};
	return jwt.sign(payload, config.authenticationSettings.tokenSecret);
}

// signup function for the /auth/signup route
const signup = (req, res) => {
	User.findOne({ email: req.body.email }).exec().then(function (existingUser) {
		if (existingUser) {
			return res.status(409).json({ message: "Email is already taken" });
		}

		// A new user is created with the information sent by the client
		const user = Object.assign(new User(), req.body);
		user.save().then(function (result) {
			res.json({
				message: 'Welcome to Chaskills, you are now logged in',
				token: createToken(result.first_name)
			});
		}).catch(function (err) {
			// Error handling.
		});
	}).catch(function (err) {
		// Error handling.
	});
};

const login = (req, res) => {
	User.findOne({ email: req.body.email }, '+password').exec().then(function (user) {
		if (!user) {
			return res.status(401).json({ message: 'Invalid email/password' });
		}

		user.comparePwd(req.body.password).then(function (isMatch) {
			if (!isMatch) {
				return res.status(401).json({ message: "Invalid email/password" });
			}

			res.json({ message: 'You are now logged in', token: createToken(user.first_name)});
		}).catch(function (err) {
			// Error handling.
		});
	}).catch(function (err) {
		// Error handling.
	});
}

// Export the functions for server.js
module.exports = Object.assign({}, { signup, login });