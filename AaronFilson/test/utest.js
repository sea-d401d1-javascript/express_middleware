const expect = require('chai').expect;
const fs = require('fs');
const midParser = require(__dirname + '/../lib/mid_parse');

describe('the json parser', () => {
  it('should parse valid json', (done) => {
    var req = fs.createReadStream(__dirname + '/test_valid_json.json');
    
    midParser(req, null, () => {
      expect(req.body.test).to.eql('This is a test');
      done();
    });
  });

  it('should not parse bad json', (done) => {
    var req = fs.createReadStream(__dirname + '/test_invalid_json.json');
    var res = {
      status: (statusCode) => {
        expect(statusCode).to.eql(400);
        return {
          json: (obj) => {
            expect(obj.msg).to.eql('invalid json');
            done();
          }
        };
      }
    };

    midParser(req, res, () => {
      throw new Error('called next on invalid json');
    });
  });
});

