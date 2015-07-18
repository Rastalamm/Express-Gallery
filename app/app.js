var db = require('../models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');




app.set('view engine', 'jade');
app.set('views', './views');

db.sequelize.sync();



// --Middleware--
//Used for preprocessing requests
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));




//create routes here
app.get('/', function(req, res) {
  res.render('index', {
    title : 'Name of the day',
    message: 'FRANK THE TANK!'
  });

});

app.get('/gallery/:id', function(req, res) {
  res.send('hello world');
});

app.get('/new_photo', function(req, res) {
  res.send('hello world');
});

app.post('/gallery', function(req, res) {
  res.send('hello world');
});

app.get('/gallery/:id/edit', function(req, res) {
  res.send('hello world');
});

app.put('/gallery/:id', function(req, res) {
  res.send('hello world');
});

app.delete('/gallery/:id', function(req, res) {
  res.send('hello world');
});




var server = app.listen(8119, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
