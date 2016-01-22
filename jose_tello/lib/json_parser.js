module.exports = exports = function(req, res, next) {
  var parsedData = '';
  req.on('data', (data) => {
    parsedData += data.toString();
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(parsedData);
      next();
    } catch(e) {
      console.log(e);
      return res.status(400).json({msg: "invalid data sent"});
    }
  });
};
