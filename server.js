var express = require('express');
var app = express();

app.use((req, res, next) => {
  var str = '';
  req.on('data', (chunk) => {
    str += chunk.toString();
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(str);
    } catch(e) {
      return res.status(400).json({msg: 'invalid json'});
    }
    next();
  });
});

app.post('*', (req, res) => {
  res.status(200).json(req.body);
});

app.listen(3000, () => console.log('server up'));
