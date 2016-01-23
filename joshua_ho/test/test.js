const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require( __dirname + '/../app.js')
const request = chai.request;
const expect = chai.expect;

var HOST = 'localhost:3000'

describe('INTEGRATION TEST for APP.JS' , () => {

	it('should respond to a GET request' , (done) =>{
		request(HOST)
			.get('/')
			.end( (err , res) => {
				expect(err).to.eql(null);
				expect( JSON.stringify(res.body) ).to.eql( 
					'{"msg":"Hello, thanks for the GET request."}' 
				);
				done();
			});

	});

	it('should return an error to a POST without an object' , (done) => { 
		request(HOST)
			.post('/')
			.end( (err , res) => {
				expect(err).to.eql(null);
				expect( JSON.stringify(res.body) ).to.eql( 
					'{"msg":"Error 400: Invalid JSON, check yourself before you wreck yourself."}' 
				);
				done();
			});
	});

	it('should respond to a JSON object POST with that object (plus a message)' , (done) => {
		request(HOST)
			.post('/')
			.send( {msg:'Hello from Test'} )
			.end( (err , res) => {
				expect(err).to.eql(null);
				expect( JSON.stringify(res.body) ).to.eql( '{"msg":"Thanks for the POST request!"}' );
				done();
			});
	});

});

describe('UNIT TEST for APP.JS' , () => {

	it('should handle a GET request' , () => { 

	});

	it('should change the ' , () => { 
	
	});

	it('should fire middleware' , () => { 
	
	});

});