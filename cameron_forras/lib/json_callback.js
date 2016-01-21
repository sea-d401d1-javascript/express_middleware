module.exports = exports = function(req, res , next) {
  var jsonString = '';
  req.on('data', function(data) {
    jsonString += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(jsonString);
    } finally {
      console.log('invalid json');
      return;
      //cb(new Error('invalid json in request'));
    }
    next();
  });
};
