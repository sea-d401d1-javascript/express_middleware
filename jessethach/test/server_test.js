const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');//eslint-disable-line
const request = chai.request;

describe('HTTP server', () => {

  before(function(done) {
    this.server = require(__dirname + '/../lib/server');
    done();
  });

  after(function(done) {
    this.server.close(done);
  });


  it('should have retrieve a JSON object', (done) => {
    request('localhost:3000')
      .get('/hello')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof(res)).to.eql('object');
        expect(res.text).to.eql('{"msg":"Message from server: Keep being awesome"}');
        done();
      });
  });

  it('should send JSON data', (done) => {
    request('localhost:3000')
    .post('/data/')
    .send({ name: 'tester'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.have.eql('{"name":"tester"}');
      done();
    });
  });

  it('should give a message about invalid json', () => {
    request('localhost:3000')
      .post('/data/')
      .send('error')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res).to.eql('woops');
        done();
    });
  });


  it('should 404 on a page that does not exist', (done) => {
    request('localhost:3000')
      .get('/doesnotexist')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('Cannot GET /doesnotexist\n');
        done();
      });
  });

});
