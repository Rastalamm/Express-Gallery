var db = require('../models');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var connect        = require('connect')
var methodOverride = require('method-override')
var idRequested;


app.set('view engine', 'jade');
app.set('views', './views');

db.sequelize.sync();



// --Middleware--
//Used for preprocessing requests
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))



var Picture = db.Picture;


//create routes here
app.get('/', function(req, res) {


  Picture.findAll().then(function (pictures){
    res.render('index', {
      pictures : pictures
    })
  }).catch(function (err) {
      throw err;
  });



});

app.get('/gallery/:id', function(req, res) {

  var idRequested = req.params.id

  Picture.findById(idRequested).then(function (picture){
    console.log(picture);
    if(picture){
      res.render('individual', {
        picture : picture
      })
    }else{
      res.render('404');
    }


  }).catch(function (err) {
      throw err;
  });


});

app.get('/gallery', function(req, res) {
  res.render('new_photo')

});


app.post('/gallery/', function(req, res) {

  Picture.create({
    author : req.body.author,
    link : req.body.link,
    description : req.body.description
  }).then(function (Picture){

    res.render('individual', {
      picture : Picture
    })
  })
});

app.get('/gallery/:id/edit', function(req, res) {

  idRequested = req.params.id

  Picture.findById(idRequested).then(function (picture){

    if(picture){
      res.render('edit_post', {
        picture : picture
      })
    }else{
      res.render('404');
    }
  }).catch(function (err) {
      throw err;
  });
});

app.put('/gallery/:id', function(req, res) {
  idRequested = req.params.id

  Picture.findById(idRequested).then(function (picture){

    picture.updateAttributes({
      author : req.body.author,
      link : req.body.link,
      description : req.body.description
    }).then(function (Picture){

      res.render('individual', {
        picture : Picture
      })

    })
  }).catch(function (err) {
      throw err;
  });
});





app.delete('/gallery/:id', function(req, res) {

  idRequested = req.params.id

  Picture.findById(idRequested).then(function (picture){

    if(picture){
      picture.destroy().then(function (){
        res.redirect('/');
      })
    }else{
      res.send('Bad ID');
    }

  }).catch(function (err) {
      throw err;
  });

});


var server = app.listen(8119, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


//Add functionality fto forward the delete me url
//make it a delte reqeuest..

//validate the form inputs
//make sure the middle one is a link
