const express = require('express');
const app = express();
const jsonParser = require(__dirname + '/lib/json_parser');

app.use(jsonParser);
app.post('/', (req, res) => {
  res.end();
});
app.listen(3000, () => console.log('Server running on port 3000'));
