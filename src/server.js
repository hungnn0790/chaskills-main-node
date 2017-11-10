const express = require('express');
const config = require('./config')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const { signup } = require('./routes/user');

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};
mongoose.Promise = global.Promise;
// Don't forget to substitute it with your connection string
mongoose.connect('mongodb://localhost/chaskills', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// We tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/auth/signup', signup);

app.listen(config.serverSettings.port);

console.log(`listening on port ${config.serverSettings.port}`);