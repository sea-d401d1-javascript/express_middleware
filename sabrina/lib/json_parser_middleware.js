module.exports = exports = (req, res, next) => {
  var jsonString = '';
  req.on('data', (data) => {
    jsonString += data.toString();
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(jsonString);
      console.log(req.body);
      console.log('POST request sent and saved!');
      next();
    } catch (e) {
      res.status(400).send({msg: 'Invalid JSON!'});
      res.end();
    }
  });
};
