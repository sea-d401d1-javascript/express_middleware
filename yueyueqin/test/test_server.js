const express = require('express');
const app = express();

var parseJSON =  require(__dirname + '/../lib/parseJSON');


app.post('/testpost',parseJSON,function(req,res,next){
  res.status(200).send(req.body);
});

app.listen(3000, () => {
  console.log('server up');
});
