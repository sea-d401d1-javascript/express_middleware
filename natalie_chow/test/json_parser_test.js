const expect = require('chai').expect;
const Stream = require('stream');

const jsonParser = require(__dirname + '/../lib/json_parser');

describe('JSON parser', () => {
  it('should parse an incoming JSON', (done) => {
    var testData = {hello: 'world'};
    var testReq = new Stream.Writable({
      write: function(chunk, encoding, next) {
        this.emit('data', chunk);
      }
    });

    var calledNext = false;
    var testNext = function() {
      calledNext = true;
      expect(testReq.body).to.eql(testData);
      done();
    };

    jsonParser(testReq, {}, testNext);
    testReq.write(JSON.stringify(testData));
    testReq.emit('end');
  });

  it('should return error message if JSON given is invalid', (done) => {
    var testReq = new Stream.Writable({
      write: function(chunk, encoding, next) {
        this.emit('data', chunk);
      }
    });

    var called = 0;
    var testRes = {
      status: function(statusCode) {
        expect(statusCode).to.eql(400);
        called++;
        return testRes;
      },
      send: function(content) {
        expect(content).to.be.an('object');
        expect(content.msg).to.eql('invalid json');
        called++;
      },
      end: function() {
        called++;
        expect(called).to.eql(3);
        done();
      }
    };

    jsonParser(testReq, testRes);
    testReq.write('{"hello":"world"}jibberish');
    testReq.emit('end');
  });

});
