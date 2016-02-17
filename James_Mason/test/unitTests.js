var expect = require('chai').expect, fs = require('fs'), jsonParser = require(__dirname + '/../lib/jsonParser');
describe ('Unit Testing', () => {
  describe('jsonParser.js', () => {
    before(() => {
      this.jsonReq = fs.createReadStream(__dirname + '/testFiles/json.txt');
      this.notJsonReq = fs.createReadStream(__dirname + '/testFiles/notJson.txt');
      this.res = {status: () => {
        return {send: () => {
          return {end: () => {}}
        }};
      }};
    });
    it('Should return a request body with a properly parsed JSON object when a request with a properly formatted JSON string is passed.', (done) => {
      jsonParser(this.jsonReq, this.res, () => {
        expect(this.jsonReq.body).to.eql({a: 'b'});
        done();
      });
    });
    it('Should return a request body which is undefined when a request with an improperly formatted JSON string is passed.', () => {
      jsonParser(this.notJsonReq, this.res, () => {});
      expect(typeof this.notJsonReq.body).to.eql('undefined');
    });
  });
});
