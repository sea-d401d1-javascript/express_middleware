const express = require('express');
const jsonParser = require(__dirname + '/lib/json_callback');
const app = express();

app.use('/hello', jsonParser);

app.post('/hello', (req, res) => {
    res.status(200).json(req.body);
});

app.listen(3000, () => console.log('server up'));
