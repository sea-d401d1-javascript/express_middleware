const chai =  require('chai');
const chaiHttp = require('chai-http');
const server = require(__dirname + '/test_server');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
var origin = 'localhost:3000';
var uri = '/testpost';

describe('Test Server', () => {

  it('should save post message in req.body', (done) => {
    request(origin)
      .post(uri)
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
});
