var chai = require('chai').use(require('chai-http')), request = chai.request, expect = chai.expect;
describe ('Integration Testing', () => {
  describe('app.js', () => {
    before((done) => {
      this.app = require(__dirname + '/../app.js'), done();
    });
    after((done) => {
      this.app.close(done);
    });
    it('Should return a successfully parsed JSON object in the response body, a successfully parsed JSON data string in the response text, and a 200 HTTP status when a client sends a POST request carrying properly formatted JSON data.', (done) =>{
      request('localhost:3000').post('/').send({a: 'b'}).end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('{"a":"b"}');
        expect(res.body).to.eql({a: 'b'});
        done();
      });
    });
    it('Should return an empty object in the response body, a message (\'invalid json\') in the response text, and a 400 HTTP status error when a client sends a POST request carrying something which is not properly formatted JSON data.', (done) =>{
      request('localhost:3000').post('/').send('{notJSON}blahblahblah').end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(400);
        expect(res.text).to.eql('invalid json');
        expect(res.body).to.eql({});
        done();
      });
    });
  });
});
