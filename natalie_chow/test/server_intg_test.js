const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/../server');

describe('Server integration', () => {
  after(() => {
    server.close();
  });

  it('should handle a 404', (done) => {
    request('localhost:3000')
      .post('/doesnotexist')
      .send({ some: 'data' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should receive a parsed result when passed valid JSON', (done) => {
    var testData = { hello: 'world', really: true };
    request('localhost:3000')
      .post('/here')
      .send(testData)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.eql(testData);
        done();
      });
  });

  it('should return msg if when passed invalid JSON', (done) => {
    request('localhost:3000')
      .post('/here')
      .send('{"name":"tj","pet":"tobi"}andsomegibberish')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(400);
        expect(res.body.msg).to.eql('invalid json');
        done();
      });
  });
});
