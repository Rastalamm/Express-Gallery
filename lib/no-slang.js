module.exports = function (req, res, next) {

  if(req.method === 'POST' || req.method === 'PUT'){
    console.log('inside inside', req.body.description);

    var description = req.body.description;

    var slangWords = {
      selfie : {reg : /(selfie)/i, replace : 'self-portrait'},
      yummers : {reg : /(yummers)/i, replace : 'delicious'},
      outchea : {reg : /(outchea)/i, replace : 'are out here'},
      bruh : {reg : /(bruh)/i, replace : 'wow'},
      doge : {reg : /(doge)/i, replace : 'pug'},
      cilantro : {reg : /(cilantro)/i, replace : 'soap'},
      bae : {reg : /(bae)/i, replace : 'loved one'},
      swag : {reg : /(swag)/i, replace : 'style'},
      yolo : {reg : /\s*(yolo)\s*/i, replace : 'carpe diem'}
    }

    for(key in slangWords){

      description = description.replace(slangWords[key].reg, slangWords[key].replace);
      console.log(description);
      req.body.description = description;
    }


  }


console.log('outside outside');



  next();
};