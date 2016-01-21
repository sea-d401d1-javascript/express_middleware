const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const fs = require('fs');
const jsonP = require(__dirname + '/../lib/jsonparser');

describe('', function() {
  it('should parse json from jsontext.txt with jsonparser.js jsonP function', function(done) {
    fs.readFile(__dirname + '/jsontext.txt', function(error, data) {
      expect jsonP(data)to.eql({ msg: 'Luke'});
      expect(res.body).to.eql({msg: 'Luke'});
      done();
    });
  });
  it('should error with jsonparser.js jsonP function from nonjsontext.txt', function(done) {

    fs.readFile(__dirname + '/nonjsontext.txt', function(error, data) {
      expect jsonP(data)to.eql({msg: "not valid json"});
      expect(res.body).to.eql({msg: "not valid json"});
      done();
    });
  });
});
