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

	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(user.password, salt, function (err, hash) {
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePwd = function (password, done) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		done(err, isMatch);
	});
}

module.exports = mongoose.model('User', userSchema);