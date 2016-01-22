const chai = require('chai');
//const chaiHttp = require('chai-http');
//chai.use(chaiHttp);
const expect = chai.expect;
//const request = chai.request;
const fs = require('fs');
const jsonP = require(__dirname + '/../lib/jsonparser');

describe('json parser', function() {
  it('should parse json with jsonparser.js jsonP function', function(done) {
    var req = fs.createReadStream(__dirname + '/jsontext.json');
    var res = null;
    jsonP(req, res, function() {
      expect(req.body.msg).to.eql('Luke');
      done();
    });
  });

  it('should error with jsonP function from nonjsontext.txt', function(done) {
    var req = fs.createReadStream(__dirname + '/nonjsontext.txt');
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.eql(400);
        return {
          json: function(obj) {
            expect(obj.msg).to.eql('not valid json');
            done();
          }
        };
      }
    };
    jsonP(req, res, function() {
      throw new Error('called invalid json');
    });
  });
});
