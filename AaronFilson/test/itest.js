const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const server = require(__dirname + '/../index');
const origin = 'localhost:3000';
const request = chai.request;

describe('integration testing', () => {
  it('should give a reply to the /go route on post', (done) => {
    request(origin)
    .post('/go')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });
  it('should reply to valid json', (done) => {
    request(origin)
    .post('/go')
    .send({ passsword: '123', confirmPassword: '123' })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(err).to.eql(null);
      done();
    });
  });
  it('should reply with err to invalid json', (done) => {

    var badJSON = '{:"nokeyHERE"}';

    request(origin)
    .post('/go')
    .send(badJSON)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(err).to.eql(null);
      done();
    });
  });  
});
server.fake = null;
