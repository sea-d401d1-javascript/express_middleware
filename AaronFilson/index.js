var express = require('express');
var mid_parse = require(__dirname + '/lib/mid_parse');

var app = express();

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});

app.get('/', function (req, res) {
  res.send('Welcome to the middleware assignment home page. Try going to /go and using a post on some JSON.');
});


app.use('/go', mid_parse);
