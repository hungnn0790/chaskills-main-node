const { 
	env,
	ip,
	port,
	db,
	authentication
} = require('./config');

module.exports = Object.assign({}, { 
	env,
	ip,
	port,
	db,
	authentication
});