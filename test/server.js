var jsonP = require(__dirname + '/../lib/jsonparser');

const express = require('express');
const app = express();

app.use('/hello', jsonP);

app.post('/hello', function(req, res) {
  res.json(req.body);
}).listen(3000, function() {
	console.log('server up');
});
