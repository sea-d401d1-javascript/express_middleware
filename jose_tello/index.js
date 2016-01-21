const express = require('express');
const app = express();

function jsonParser(req, res, next) {
  res.status(200);
  req.on('data', (data, err) => {
    if (err) res.status(404).send({error: "invalid json"});
    req.body = JSON.parse(data);
  });
  req.on('end', () => {
    console.log(req.body);
  })
  next();
};

app.use(jsonParser);
app.post('/', (req, res) => {});

app.listen(3000, () => console.log('Server running on port 3000'));
