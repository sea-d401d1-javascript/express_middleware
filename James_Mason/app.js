module.exports = exports = require('express')().post('/*', require(__dirname + '/lib/jsonParser'), (req, res) => res.status(200).json(req.body).end()).listen(3000);
