const express = require('express');
const app = express();

function jsonParser(req, res, next) {
  var parsedData = '';
  res.status(200);
  req.on('data', (data, err) => {
    parsedData += data;
  });
  req.on('end', () => {
    req.body = JSON.parse(parsedData);
    console.log(req.body);
    next();
  })
};

app.use(jsonParser);
app.post('/', (req, res) => {});
app.listen(3000, () => console.log('Server running on port 3000'));
