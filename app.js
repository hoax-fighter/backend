//atlas db = mongodb://diditaditya:hoaxchecker@liedb-shard-00-00-oj2ia.mongodb.net:27017,liedb-shard-00-01-oj2ia.mongodb.net:27017,liedb-shard-00-02-oj2ia.mongodb.net:27017/hoax-dev?ssl=true&replicaSet=LIEdb-shard-0&authSource=admin

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*")
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
 next()
})

// app.use(cors());
// mongoose setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const localDb = 'mongodb://localhost/hoax-fighter';
const atlas = 'mongodb://diditaditya:hoaxchecker@liedb-shard-00-00-oj2ia.mongodb.net:27017,liedb-shard-00-01-oj2ia.mongodb.net:27017,liedb-shard-00-02-oj2ia.mongodb.net:27017/hoax-dev?ssl=true&replicaSet=LIEdb-shard-0&authSource=admin';
let db_config = {
  development: atlas,
  test: 'mongodb://localhost/hoax-fighter-test',
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



// routes
const source = require('./routes/source');
const checker = require('./routes/checker');
const board = require('./routes/board');
const post = require('./routes/post')

// use the route
app.use('/api/source', source);
app.use('/api/check', checker);
app.use('/api/board', board);
app.use('/api/post', post)

app.listen(app.get('port'), () => {
  console.log(`app listening on ${app.get('port')}`);
});

module.exports = app;
