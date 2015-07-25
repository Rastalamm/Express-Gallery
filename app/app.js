var db = require('../models');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var idRequested;
var slangAway = require('../lib/no-slang');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');

var Picture = db.Picture;
var User = db.User;
var hashWord;



app.set('view engine', 'jade');
app.set('views', './views');

db.sequelize.sync();


// createUser('judah', 'password123');


// --Middleware--
//Used for preprocessing requests
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// app.use(slangAway);

//New middleware for the auth
app.use(session(
  {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(
    function(user) {
      done(null, user);
    });
});


/*
Need to update the username db check
Check the DB to make sure the Username matches
*/

passport.use(new LocalStrategy(
  function(username, password, done) {

      User.findOne({
        where: { username: username }
      }).then(function(user) {

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !==  makeHash(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }).catch(function (err) {
        return done(err, null);
        throw err;
      });
  }
));

//passes in the user variable to jade templates
app.use(function(req, res, next){
  app.locals.user = req.user;
  next();
});


//function that redirects the user back to the home page if they are not authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}


function makeHash (password){

  var shasum = crypto.createHash('sha256');
  shasum.update(password);

  hashWord = shasum.digest('hex');

  return hashWord;
}


function createUser (username, password){

  User.create({
    username : username,
    password : makeHash(password)
  })
}



//create routes here


app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }));

app.get('/login', function (req, res) {

  res.render("login", { user: req.user, messages: req.flash('error') } );
});

app.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

app.post('/register', function (req, res) {

  User.find({
    where: {username : req.body.username}
  }).then(function(user){

    if (user){
      console.log('Its a user!');
      res.render("register");
    }else{
      createUser(req.body.username, req.body.password);
      res.render("login");
    }
  })
});

app.get('/register', function (req, res) {
  res.render("register");
});




app.get('/', function(req, res) {

  Picture.findAll({
    order : [['created_at', 'ASC']]
  }).then(function (pictures){

    res.render('index', {
      pictures : pictures
    })
  }).catch(function (err) {
    res.send(err);
      throw err;
  });



});

app.get('/gallery/:id', function(req, res) {

  var idRequested = req.params.id

  Picture.findById(idRequested).then(function (picture){

    if(picture){
      Picture.findAll().then(function (pictures){
        res.render('individual', {
          picture : picture,
          pictures : pictures,
          imgData_json : JSON.stringify(picture)
        })

      })
    }else{
      res.render('404');
    }


  }).catch(function (err) {
      throw err;
  });


});

app.get('/gallery', ensureAuthenticated, function(req, res) {
  res.render('new_photo')

});


app.post('/gallery', ensureAuthenticated, function(req, res) {
  idRequested = req.params.id
  var allPics;
  Picture.findAll().then(function (pictures){
    allPics = pictures;
  })

  Picture.create({
    author : req.body.author,
    link : req.body.link,
    description : req.body.description
  })
  .then(function (Picture){
    res.send(200, {
      id : Picture.id,
      author : Picture.author,
      link : Picture.link,
      description : Picture.description
    })
  })
});

//ensureAuthenticated
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
//ensureAuthenticated
app.put('/gallery/:id', function(req, res) {
  idRequested = req.params.id
  var allPics;
  Picture.findAll().then(function (pictures){
    allPics = pictures;
  })

  Picture.findById(idRequested).then(function (picture){

    picture.updateAttributes({
      author : req.body.author,
      link : req.body.link,
      description : req.body.description
    }).then(function (Picture){


      res.send(200, {
        id : Picture.id,
        author : Picture.author,
        link : Picture.link,
        description : Picture.description
      })
      // res.render('individual', {
      //   picture : Picture,
      //   pictures : allPics
      // })

    })
  }).catch(function (err) {
      throw err;
  });
});


app.delete('/gallery/:id', function(req, res) {

  console.log('delte');

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
