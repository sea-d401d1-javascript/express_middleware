const querystring = require('query-string');

module.exports = exports = jsonParse = function(req, res, next) {

  req.body = "";
  req.on('data', function(chunk) {
    req.body += chunk;
  })

  req.on('end', function() {
    req.body = querystring.parse(req.body);
    next();
  })

}