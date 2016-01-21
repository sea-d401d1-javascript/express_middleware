//Express assignment for executing middleware
//20 Jan 2016

//Requirements:
//1. Parses incoming JSON
//2. On successful parse, object should be saved into req.body
//3. On failed parse, middleware should respond with the apropriate status
//	 code and the message 'invalid JSON'
//4. Middleware should be tested in UNIT and INTEGRATION methods.

//Personal Notes:
//I'd like to find a way to do this without using an external variable


const express = require('express');
const app = express();

var PORT = 3000;
var isObject = null;   //Used as a flag for POST request below. 
											 //This doesn't reset between post requests....

//3. On failed parse...
//Error handling middleware, via expressjs.com
app.use( (err , req , res , next) => {
	res.status(500).send('Invalid JSON or some other thing you did wrong.');
});

app.get('/' , ( req , res , next ) => {
	console.log('Request Type: ' + req.method);
	next();

} , (req , res) => {
	res.send('Hello, thanks for the GET request.');
});

app.post('/' , (req , res , next) => {
	
	req.on('data' , (chunk) => {
		//1. Parses incoming JSON objects...
		var obj = JSON.parse(chunk);		
		//2. On successful parse, assign req.body to JSON object
		if ( typeof obj === 'object' ) {
			req.body = obj;
			isObject = true;
		}
	});

	req.on('end' , () => {		
		next();
	});

} , (req , res) => {
	
	//3. On parse failure...
	if (isObject === null) {
		console.log('POST request rejected - invalid JSON');
		res.status(400).send('Error 400: Bad Request. Invalid JSON, check yourself.');
	}
	if (isObject !== null){
		console.log('Object ' + JSON.stringify(req.body) + ' received.');
		res.status(200).send('Thanks for the POST request: ' + JSON.stringify(req.body) );
		isObject = null;
	}

});

app.listen( PORT , () => {
	console.log('Server is running on port ' + PORT );
});
