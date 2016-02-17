var express = require('express');
var mid_parse = require(__dirname + '/lib/mid_parse');

var app = express();

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the middleware assignment home page. Try going to /go and using a post on some JSON.');
});

app.post('/go', mid_parse, (req, res, next) => {
  res.write('Should have JSON now: ' + req.body);
  res.end();
  next();
});
