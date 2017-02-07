var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require('../server');
var expect = chai.expect;
var db = require("../db").init;


chai.use(chaiHttp);

describe("Clear messages...", function(done) {
  
  beforeEach(function(done){
    db.none('TRUNCATE messages RESTART IDENTITY');
    done();
  });
  
  it('should not see data', function(done) {
    db.any('select * from messages')
    .then(function(data){
      expect(data).to.deep.equal([]);
      }).then(done, done);
  });
});

describe('Messages', function(){
  
  it('should add a SINGLE message on /messages POST', function(done) {
    chai.request(server)
    .post('/api/messages')
    .send({ "content":"test", 'author':'id' })
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.status('success');
      done();
    });
  });
  
  it('should list ALL messages on /messages/active GET', function(done){
    chai.request(server)
      .get('/api/messages')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('content');
        expect(res.body[0].content).to.equal('test')
        done();
      });
  });
  
  it('should list a SINGLE message on /message/:id GET', function(done) {
    chai.request(server)
      .get('/api/messages/1')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('content');
        expect(res.body.content).to.equal('test')
        done();
      });    
  });
   
});