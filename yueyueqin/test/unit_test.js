const chai =  require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const server = require(__dirname + '/test_server');
const util = require('util');
const Stream  = require('stream');

const express = require('express');
const app = express();

var origin = 'localhost:3000';
var url = '/testpost';

var Req = function() {

};
util.inherits(Req,Stream);

describe('parse JSON', () => {

  it('should send JSON data', (done) => {

    var jsonString = '';
    Req.prototype.data = function(){
      return function(chunckData) {
        jsonString +=  chunckData.toString();
      };
    };
    Req.prototype.end = function() {
      expect(jsonString).to.equal('{"name":"yueue"}');
    };
    var req = new Req();

    request(origin)
      .post(url)
      .send('{ "name": "yueyue"}')
      .end((err,res) => {
        console.log(res.statusCode);
        console.log(res.text);
        console.log(JSON.parse(res.text));
        req.data();
        req.end();
        //expect(err).to.eql(null);
        //expect(JSON.parse(res.text).name).to.eql('yueyue');
        //expect(res.statusCode).to.eql(200);
        done();
      });

    // app.post('/testpost',function(req,res,next) {
    //   req.data();
    //   req.on();
    //   next();
    // });
    //
    // app.post(function(req,res,next){
    //   console.log(res);
    //   expect(res.statusCode).to.eql(400);
    // });
    //
    // app.listen(3000, () => {
    //   console.log('server up');
    // });

  });

});
