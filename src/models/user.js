var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var userSchema = new Schema({
	first_name: String,
	last_name: String,
	email: { type: String, unique: true, lowercase: true},
	password: { type: String, select: false },
	created_at: { type: Date, default: Date.now },
	updated_at: Date
});

userSchema.pre('save', function (next) {
	var user = this;

	if (!this.created_at) {
		this.created_at = new Date();
	}

	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePwd = function (password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, this.password, (err, isMatch) => {
			if (err) {
				reject(err);
			} else {
				resolve(isMatch);
			}
		});
	});
}

module.exports = mongoose.model('User', userSchema);