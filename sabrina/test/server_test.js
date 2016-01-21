const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require(__dirname + '/../server');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var origin = 'localhost:3000';
var uri = '/jsonSend';

describe('rest functionality of server', () => {
  after(() => server.close());

  it('should respond to a POST request', (done) => {
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
});
