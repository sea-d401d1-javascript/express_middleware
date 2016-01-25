'use strict';

const expect = require('chai').expect;
const Stream = require('stream').Writable;
const jsonParser = require(__dirname + '/../index.js');

describe('JSON parser unit tests', () => {
  it('should parse valid json', (done) => {
    const testReq = new Stream();
    let called = 0;
    testReq.write = function(string) {
      this.emit('data', string);
      called++;
    };
    testReq.end = function() {
      this.emit('end');
      called++;
    };
    const testNext = () => {
      expect(testReq).to.have.property('body');
      expect(testReq.body).to.be.an('object');
      expect(testReq.body.test).to.eql('test');
      done();
    };
    jsonParser(testReq, {}, testNext);
    testReq.write(JSON.stringify({ 'test': 'test' }));
    testReq.end();
  });
  it('should reply for invalid JSON', (done) => {
    const testReq = new Stream();
    let called = 0;
    testReq.write = function(string) {
      this.emit('data', string);
      called++;
    };
    testReq.end = function() {
      this.emit('end');
      called++;
    };
    let testRes = {
      status(code) {
        called++;
        expect(code).to.eql(500);
        return this;
      },
      send(string) {
        called++;
        expect(string).to.eql('invalid json');
        done();
      }
    };
    const testNext = () => {
      expect(testReq).to.not.have.property('body');
      done();
    };
    jsonParser(testReq, testRes, testNext);
    testReq.write('{"test"::test}');
    testReq.end();
  });
});
