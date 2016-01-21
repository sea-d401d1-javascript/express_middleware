const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('simple http server', function() {
  it('should respond to a post request to hello with parsed JSON', function(done) {
    request('localhost:3000')
      .post('/hello')
      .send({ msg: 'Luke' })
      .end(function(err,res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.eql({msg: 'Luke'});
        done();
      });
  });
  it('should error to an invalid post request to hello with parsed JSON', function(done) {
    request('localhost:3000')
      .post('/hello')
      .send('Luke')
      .end(function(err,res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(400);
        expect(res.body).to.eql({msg: "not valid json"});
        done();
      });
  });
});

