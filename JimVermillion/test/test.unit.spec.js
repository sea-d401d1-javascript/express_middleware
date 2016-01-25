'use strict';

const pp = require(__dirname + '/../lib/parsyParse.js'); //eslint-disable-line
const fs = require('fs'); //eslint-disable-line
const chai = require('chai');
const expect = chai.expect;

describe('unit testing that the JSON in the req stream is parsed', () => {
  let testReq = fs.createReadStream(__dirname + '/testFiles/test.txt');
  let testRes = {};
  let next = () => {};
  before( (done) => {
    pp(testReq, testRes, next);
    done();
  });

  it('should parse JSON from file to js object', () => {
    expect(testReq).to.have.property('body');
    expect(testReq.body).to.be.an('object');
    expect(testReq.body).to.eql({ hello: 'world' });
  });
});

describe('unit testing faulty JSON in the req stream errors out', () => {
  let testReq = fs.createReadStream(__dirname + '/testFiles/test1.txt');
  let testRes = {};
  let next = () => {};
  before( (done) => {
    pp(testReq, testRes, next);
    done();
  });

  it('should show an error', () => {
    expect(testReq).to.have.property('body');
    expect(testRes.statusCode).to.eql(401);
    expect(testReq.body).to.eql({ msg: 'invalid json' });
  });
});
