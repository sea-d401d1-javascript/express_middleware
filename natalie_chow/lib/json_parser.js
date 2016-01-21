module.exports = exports = (req, res, next) => {
  var jsonStr = '';

  req.on('data', (data) => {
    jsonStr += data.toString();
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(jsonStr);
      next();
    } catch (e) {
      console.error(e);
      res.status(400).send({msg: 'invalid json'});
      res.end();
    }
  });
}
