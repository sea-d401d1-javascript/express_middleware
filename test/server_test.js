var chai = require('chai');
var server = require(__dirname + '/../server.js');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
var request = chai.request;

describe('simple express server', () => {
  it('should parse json data', (done) => {
    request('localhost:3000')
      .post('/')
      .send('{"hello":"world"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.hello).to.eql('world');
        done();
      });
  });

  it('should not parse invalid json', (done) => {
    request('localhost:3000')
      .post('/')
      .send('im not json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(400);
        expect(res.body.msg).to.eql('invalid json');
        done();
      });
  });

  it('should post on any url', (done) => {
    request('localhost:3000')
      .post('/apwoefj/awepfij/woeih')
      .send('{"hello":"world"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.hello).to.eql('world');
        done();
      });
  });
});
