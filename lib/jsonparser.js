module.exports = function jsonP(req, res, next) {
  var chunk = '';

  req.on('data', function(data) {
    chunk += data.toString();
  });

  req.on('end', function() {
    try {
      req.body = JSON.parse(chunk);
    } catch (error) {
      console.log(error);
      return res.status(400).json({msg: "not valid json"});
    }
    next();
  });
}
