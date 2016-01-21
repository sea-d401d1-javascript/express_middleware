'use strict';
module.exports = exports = function(req, res, next){
  var toParse = '';
  req.on('data', function (data){
      toParse += data;
  });
  req.on('end', function () {
    try{
      req.body = JSON.parse(toParse);
    }catch(err){
      req.body = { msg: 'invalid json' } ;
      res.statusCode = 401;
    }
    next();
  });
}