const chai =  require('chai');
const expect = chai.expect;
const fs = require('fs');
const parseJSON = require(__dirname + '/../lib/parseJSON');


describe('parse JSON', () => {

  it('should send JSON data', (done) => {
    var req = fs.createReadStream(__dirname + '/valid_json.json');
    parseJSON(req, null, function() {
      expect(req.body.name).to.equal('yueyue');
      done();
    });
  });

  it('should not parse invalid json', (done) => {
    var req = fs.createReadStream(__dirname + '/invalid_json.json');
    var res = {
      status: function(statusCode) {
        expect(statusCode).to.equal(400);
        return {
          json: function(obj) {
            expect(obj.error).to.equal('invalid json');
            done();
          }
        };
      }
    };
    parseJSON(req,res,function() {
      throw new Error('called next function if error');
    });
  });

});
