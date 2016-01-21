const express = require('express');
const jsonParser = require(__dirname + '/lib/json_callback');
const app = express();

// var sendRes = function(res) {
//   return function(input) {
//     res.writeHead(input.statusCode, {'Content-Type': 'application/json'});
//     res.write('{"msg": "' + input.msg + '"}'); // '{"msg":"could not parse json"}'
//     res.end();
//   };
// };

app.use('/hello', jsonParser);

app.post('/hello', (req, res) => {
    res.status(200).json(req.body);
  });

// jsonParser(req, (err, data) => {
//     var statusCode = (err) ? 500: 200;
//     var msg = JSON.stringify((err) ? {msg: 'invalid json'}:data);
//     res.writeHead(statusCode, {'Content-Type': 'application/json'});
//     res.write(msg);
//     res.end();
// });

app.listen(3000, () => console.log('server up'));
