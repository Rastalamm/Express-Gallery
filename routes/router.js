var express = require('express');
var router = express.Router();

// create routes here
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/',
                                   failureFlash: true }));

//used for login ajax funtionality
// app.post('/login', function(req, res, next) {

//   console.log('in /login');

//     passport.authenticate('local', function(err, user, info) {
//         if (err) { return next(err); }
//         console.log(user);
//         if (!user) { return res.render('index'); }
//         req.logIn(user, function(err) {
//             if (err) { return next(err); }
//             return res.render('index');
//            // return res.json({id : user.id, username : user.username});
//         });
//     })(req, res, next);
// });


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
app.get('/gallery/:id/edit', ensureAuthenticated, function(req, res) {

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

app.put('/gallery/:id', ensureAuthenticated, function(req, res) {
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


app.delete('/gallery/:id', ensureAuthenticated, function(req, res) {

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
