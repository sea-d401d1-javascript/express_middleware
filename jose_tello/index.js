const express = require('express');
const app = express();
const jsonParser = require(__dirname + '/lib/json_parser');

app.use(jsonParser);
app.post('/', function(req, res) {
  res.json(req.body);
  res.end();
});
app.listen(3000, () => console.log('Server running on port 3000'));
