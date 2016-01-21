var chai   = require('chai'),
  chaiHTTP = require('chai-http'),
  fs       = require('fs'),
  server   = require('../index');

chai.use(chaiHTTP);
var expect = chai.expect,
  request  = chai.request;

describe('UNIT: tests the POST request and the error handler', () => {
  it('should handle a POST request', (done) => {
    request('localhost:3000')
    .post('/')
    .send({"hello":"world"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('POST should return a message if error', (done) => {
    request('localhost:3000')
    .post('/')
    .send('string')
    .end((err, res) => {
      expect(res.body).to.eql({msg: "invalid data sent"});
      done();
    });
  });
});

// describe('INTEGRATION: ')
