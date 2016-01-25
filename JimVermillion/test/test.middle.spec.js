'use strict';

const chai = require('chai');
chai.use(require('chai-http'));
const request = chai.request;
const expect = chai.expect;
const express = require('express');
const pp = require(__dirname + '/../lib/parsyParse.js');

var app = express();

describe('make sure that the middleware spits out error', () => {
  let server;
  before( (done) => {
    app.use(pp);
    app.post('/', (req, res) => {
      res.send(JSON.stringify(req.body) );
    });
    server = app.listen(3000);
    done();
  });
  after( (done) => {
    server.close();
    done();
  });

  it('should show error with no JSON sent', (done) => {
    request('localhost:3000')
      .post('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(401);
        expect(res.text).to.eql(JSON.stringify({ msg: 'invalid json' }));
        done();
    });
  });
});

describe('make sure that the middleware spits out error', () => {
  let server;
  before( (done) => {
    app.use(pp);
    app.post('/', (req, res) => {
      res.send(JSON.stringify(req.body) );
    });
    server = app.listen(3000);
    done();
  });
  after( (done) => {
    server.close();
    done();
  });
  //eslint-disable-line
  it('should parsed JSON middleware works', (done) => {
    let testObj = JSON.stringify({ passsword: '123', confirmPassword: '123' });
    request('localhost:3000')
      .post('/')
      .send(testObj)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql(testObj);
        done();
    });
  });
});
