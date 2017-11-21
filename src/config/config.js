const convict = require('convict');

const config = convict({
	env: {
	    doc: "The application environment.",
	    format: ["prod", "dev", "test"],
	    default: "dev",
	    env: "NODE_ENV"
	},
  	ip: {
	    doc: "The IP address to bind.",
	    format: "ipaddress",
	    default: "127.0.0.1",
	    env: "IP_ADDRESS"
	},
  	port: {
	    doc: "The port to bind.",
	    format: "port",
	    default: 3000,
	    env: "PORT"
  	},
  	db: {
	    host: {
	      doc: "Database host name/IP",
	      format: '*',
	      default: 'mongodb://localhost/'
	    },
	    name: {
	      doc: "Database name",
	      format: String,
	      default: 'chaskills'
	    },
	    options: {
			useMongoClient: true,
		  	socketTimeoutMS: 0,
		  	keepAlive: true,
		  	reconnectTries: 30
		}
  	},
  	authentication: {
  		tokenSecret: {
  			doc: "Token secret.",
		    format: "*",
		    default: "super12346",
		    env: "TOKEN_SECRET"
  		}
  	}
});

const env = config.get('env');
config.loadFile('./src/config/env/' + env + '.json');
config.validate({allowed: 'strict'});

module.exports = config.getProperties();