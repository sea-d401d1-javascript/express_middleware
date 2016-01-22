const chai       = require('chai');
const chaiHTTP   = require('chai-http');
const fs         = require('fs');
const jsonParser = require(__dirname + '/../lib/json_parser');
chai.use(chaiHTTP);
const expect     = chai.expect;
const request    = chai.request;

describe('UNIT: tests the json parser', () => {
  it('should parse JSON', (done) => {
    var req = fs.createReadStream(__dirname + '/../lib/sample_json.json');
    jsonParser(req, null, function() {
      expect(req.body.hello).to.eql('world');
      done();
    });
  });
  it('should return an error message if json is invalid', (done) => {
    var req = fs.createReadStream(__dirname + '/../lib/sample2_json.json');
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.eql(400);
        return {
          json: function(obj) {
            expect(obj.msg).to.eql('invalid data sent');
            done();
          }
        }
      }
    };
    jsonParser(req, res);
  });
});

describe('INTEGRATION: tests the express server', () => {
  it('should be able to handle POST requests', (done) => {
    var jsonString = fs.createReadStream(__dirname + '/../lib/sample_json.json');
    request('localhost:3000')
    .post('/')
    .send(jsonString)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });
});
