const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


// mongoose setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db_config = {
  development: 'mongodb://localhost/hoax-fighter',
  test: 'mongodb://localhost/hoax-fighter-test'
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => { console.log('Mongo Db connection success!') });

let app_env = app.settings.env;

mongoose.connect(db_config[app_env], function (err, res) {
  console.log('connected to database ' + db_config[app_env]);
});

// port setup
app.set('port', process.env.PORT || 3002);

// bodyparser setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// routes
const source = require('./routes/source');
const checker = require('./routes/checker');
const board = require('./routes/board');

// use the route
app.use('/api/source', source);
app.use('/api/check', checker);
app.use('/api/board', board);

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;
