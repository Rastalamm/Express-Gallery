module.exports = function (req, res, next) {

  if(req.method === 'POST' || req.method === 'PUT'){
    console.log('inside inside', req.body.description);

    var description = req.body.description;

    var slangWords = {
      selfie : {reg : /\bselfie\b/i, replace : 'self-portrait'},
      yummers : {reg : /\byummers\b/i, replace : 'delicious'},
      outchea : {reg : /\boutchea\b/i, replace : 'are out here'},
      bruh : {reg : /\bbruh\b/i, replace : 'wow'},
      doge : {reg : /\bdoge\b/i, replace : 'pug'},
      cilantro : {reg : /\bcilantro\b/i, replace : 'soap'},
      bae : {reg : /\bbae\b/i, replace : 'loved one'},
      swag : {reg : /\bswag\b/i, replace : 'style'},
      yolo : {reg : /\byolo\b/i, replace : 'carpe diem'}
    }


    var regex = new RegExp('\b' + pattern + '\b', 'ig')


    for(key in slangWords){
      description = description.replace(slangWords[key].reg, slangWords[key].replace);
      req.body.description = description;
    }
  }


console.log('outside outside');



  next();
};