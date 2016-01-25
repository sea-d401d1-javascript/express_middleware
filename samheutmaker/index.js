const express = require('express');

const jsonParser = require(__dirname + '/json-parser.js');

const PORT = process.env.PORT || 3000;

var app = express();

var router = new express.Router();

app.use(jsonParser);


router
	.post('/', function(err, req, res, next) {
		if (err) {
			console.log(err);
			console.log('hit1');
			res.status(500).send('Something went wrong.');
		}

		next();
		}, function(req, res){
			res.json(req.body);
	});

app.use('/', router);

app.listen(PORT, function(){
	console.log('Server up and running');
}); 