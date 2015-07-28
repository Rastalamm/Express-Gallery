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
var routes = require('../routes/router');




//Const: .30
//Kawika: .3
//Dan: .6
//Jason: .23
//Judah: .24

app.set('view engine', 'jade');
app.set('views', './views');

db.sequelize.sync();


// createUser('judah', 'password123');

app.use('/', routes);
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


var server = app.listen(8119, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
