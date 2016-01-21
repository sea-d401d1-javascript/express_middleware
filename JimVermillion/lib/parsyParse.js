'use strict';
module.exports = exports = function(req, res, next) {
  var toParse = '';
  req.on('data', (data) => {
      toParse += data;
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(toParse);
    } catch (err) {
      req.body = { msg: 'invalid json' };
      res.statusCode = 401;
    }
    next();
  });
};
