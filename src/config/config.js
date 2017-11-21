const authenticationSettings = {
	tokenSecret: process.env.TOKEN_SECRET || 'super12346'
}

const serverSettings = {
  port: process.env.PORT || 3000
}

const dbSettings = {
	server: 'mongodb://localhost/chaskills',
	options: {
		useMongoClient: true,
	  	socketTimeoutMS: 0,
	  	keepAlive: true,
	  	reconnectTries: 30
	}
}

module.exports = Object.assign({}, { authenticationSettings, serverSettings, dbSettings });