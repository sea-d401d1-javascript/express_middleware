var express = require('express');
var router = express.Router();
var handlers = require('./handlers');

router.all('/', function(req, res, next){
  //console.log('in the middleware router.all function 1, where we will parse JSON.');
  var dataObj;
  req.on('data', function(chunk){
    //console.dir('data: ' + chunk);
    dataObj += chunk;
  });

  req.on('end', () => {
    debugger;
    //console.dir(req);
    if(dataObj){
      //console.log('end');
      try {
        req.body = JSON.parse(dataObj);
      }
      catch(e) {

         console.log(e);
      }

      next();
    }
    next();
  });

}, function(req, res){
  //hand off json to handlers
  //console.log('in next func.');
  res.write('Should have JSON now: ' + req.body);
  res.end();
});


module.exports = router;
