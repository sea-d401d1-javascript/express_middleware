const express = require('express');
const app = express();

var parseJSON =  require(__dirname + '/../lib/parseJSON');

app.use('/testpost',parseJSON);

app.post('/testpost',function(req,res,next){
  res.status(200).send(req.body);
});

app.listen(3000, () => {
  console.log('server up');
});
