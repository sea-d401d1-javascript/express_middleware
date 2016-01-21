module.exports = exports = function(req, res, next) {
  var jsonString = '';
  req.on('data', function(data) {
    jsonString += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(jsonString);
    } catch(err) {
      res.status(400).send('invalid json ');
    }
    next();
  });
};
