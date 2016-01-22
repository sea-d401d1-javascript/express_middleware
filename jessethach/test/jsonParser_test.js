const expect = require('chai').expect;
const jsonParser = require(__dirname + '/../lib/jsonParser');
const fs = require('fs');

describe('json parser', () => {

  it('should successfully parse some json', (done) => {
    var req = fs.createReadStream(__dirname + '/test_valid_json.json');
    jsonParser(req, null, function(){
      expect(req.body.msg).to.eql('this is a test file');
      done();
    });
  });

  it('should not parse invalid json', (done) => {
    var req = fs.createReadStream(__dirname + '/test_invalid_json.json');
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.eql(400);
        return {
          json: function(obj) {
            expect(obj.msg).to.eql('invalid json');
            done();
          }
        };
      }
    };
    jsonParser(req, res);
  });

});
