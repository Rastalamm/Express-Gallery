module.exports = function (req, res, next) {

  if(req.method === 'POST' || req.method === 'PUT'){
    console.log('inside inside', req.body.description);

    var description = req.body.description;

    var slangWords = {
      selfie : 'self-portrait',
      yummers : 'delicious',
      outchea : 'are out here',
      bruh : 'wow',
      doge : 'pug',
      cilantro : 'soap',
      bae : 'loved one',
      swag : 'style',
      yolo : 'carpe diem'
    }

    for(key in slangWords){
      var regex = new RegExp('\\b' + key + '\\b', 'ig')
      description = description.replace(regex, slangWords[key]);
      req.body.description = description;
    }
  }
  next();
};

