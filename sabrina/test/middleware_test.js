const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(__dirname + '/../server');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var origin = 'localhost:3000';
var uri = '/jsonSend';

describe('functionality of the JSON parsing middleware', () => {
  after(() => server.close());

  it('should save a parsed POST request at /jsonSend', (done) => {
    var jsonName = {"name": "sab"};
    request(origin)
      .post(uri)
      .send(jsonName)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.eql(jsonName);
        done();
      });
  });

  it('should respond to an invalid JSON POST request', (done) => {
    var jsonName = 'sab';
    request(origin)
      .post(uri)
      .send(jsonName)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('Invalid JSON!');
        done();
      });
  });
});
