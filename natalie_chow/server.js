const express = require('express');
const app = express();
const jsonParser = require(__dirname + '/lib/json_parser');

app.post('/here',
  jsonParser,
  (req, res) => {
    res.json(req.body);
    res.end();
  }
);

module.exports = exports = app.listen(3000, () => {
  console.log('server up on port 3000');
});
