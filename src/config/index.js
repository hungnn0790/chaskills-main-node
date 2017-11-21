const { authenticationSettings, serverSettings, dbSettings } = require('./config');

module.exports = Object.assign({}, { authenticationSettings, serverSettings, dbSettings });