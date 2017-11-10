const authenticationSettings = {
	tokenSecret: process.env.TOKEN_SECRET || 'super12346'
}

const serverSettings = {
  port: process.env.PORT || 3000
}

module.exports = Object.assign({}, { authenticationSettings, serverSettings });