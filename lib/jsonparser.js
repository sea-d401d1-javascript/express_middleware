module.exports = function jsonP(req, res, next) {
  var chunk = '';

  req.on('data', function(data) {
    chunk += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(chunk);
      next();
    } catch (error) {
      res.status(400).send({msg: "not valid json"});
      res.end();
    }
  });
}


