const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(__dirname + '/temp-server');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var origin = 'localhost:8000';
var uri = '/post';

describe('rest functionality of the server', () => {
  after(() => server.close());

  it('should respond to a POST request', (done) => {
    request(origin)
      .post(uri)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.text).to.eql('Got a POST request');
        done();
      });
  });
});
