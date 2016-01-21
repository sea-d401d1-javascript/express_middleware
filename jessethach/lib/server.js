const express = require('express');
const app = express();

app.get('/hello', (req, res, next) => {
    req.body = 'Keep being awesome';
    next();
  },
  (req, res) => {
    res.status(200).json({msg: 'Message from server: ' + req.body});
});

app.post('/data', (req, res, next) => {
    req.on('data', (data) => {
      try {
        debugger;
      var parsed = JSON.parse(data.toString());
      req.body = parsed;
      next();
    } catch (e) {
      debugger;
      console.log(e);
      res.status(400).send({msg: 'invalid json'});
      res.end();
    }
    });
  },
  (req, res) => {
    res.json(req.body);
    res.end();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Along the way, something got broked.');
});

module.exports = exports = app.listen(3000, () => console.log('server up'));
