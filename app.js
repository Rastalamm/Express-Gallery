var db = require('./models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

db.sequelize.sync();







var server = app.listen(8119, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
