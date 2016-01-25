const express = require('express');
const app = express();
var parseJSON =  require(__dirname + '/lib/parseJSON');


app.post('/post',parseJSON,(req,res,next) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

app.listen(3000, () => {
  console.log('server up');
});
