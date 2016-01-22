const chai =  require('chai');
const chaiHttp = require('chai-http');
const server = require(__dirname + '/test_server');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var origin = 'localhost:3000';
var url = '/testpost';

describe('Test Server', () => {
  it('should post JSON data ', (done) => {
    request(origin)
      .post(url)
      .send('{ "name": "yueyue"}')
      .end((err,res) => {
        console.log(res.statusCode);
        console.log(res.text);
        console.log(JSON.parse(res.text));
        expect(err).to.eql(null);
        expect(JSON.parse(res.text).name).to.eql('yueyue');
        expect(res.statusCode).to.eql(200);
        done();
      });
  });

  it('should return 500 if parsing data is not JSON', (done) => {
    request(origin)
      .post(url)
      .send('yueyue')
      .end((err,res) => {
        console.log(res.statusCode);
        console.log(res.text);
        console.log(JSON.parse(res.text));
        expect(err).to.eql(null);
        expect(JSON.parse(res.text).error).to.eql('invalid json');
        expect(res.statusCode).to.eql(400);
        done();
      });
  });
});
