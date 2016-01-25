'use strict';

const express = require('express');
const jsonParser = require(__dirname + '/../index');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));

/* eslint-disable no-unused-expressions */

describe('jsonParser middleware integration', () => {
  before(() => {
    this.app = express();
    this.app.use(jsonParser);
    this.server = this.app.listen(3000);
  });

  it('should parse valid json', (done) => {
    let called = 0;
    this.app.get('/test', (req, res) => {
      expect(req.body).to.be.an('object');
      expect(req.body.test).to.eql('test');
      called++;
      res.status(500).send('success');
    });
    chai.request('localhost:3000').get('/test')
      .send({ 'test': 'test' })
      .end(() => {
        expect(called).to.eql(1);
        done();
      });
  });

  it('should return invalid for bad json', (done) => {
    this.app.get('/invalid', () => {});
    chai.request('localhost:3000').get('/invalid')
      .send('{"test"::}')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status('500');
        expect(res.text).to.eql('invalid json');
        done();
      });
  });

  after(() => {
    this.server.close();
  });
});
