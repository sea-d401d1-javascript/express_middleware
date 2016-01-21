const express = require('express');
const app = express();

function jsonParser(req, res, next) {
  var parsedData;
  res.status(200);
  req.on('data', (data) => {
    if (data) {
      try {
        parsedData = JSON.parse(data);
      } catch(e) {
        console.log('error parsing string');
        res.status(404).send({msg: "invalid data sent"});
      }
    }
  });
  req.on('end', () => {
    req.body = parsedData
    console.log(req.body);
    next();
  });
};

app.use(jsonParser);
app.post('/', (req, res) => {
  res.end();
});
app.listen(3000, () => console.log('Server running on port 3000'));
