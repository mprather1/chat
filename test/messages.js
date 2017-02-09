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
  
  before(function(done){
    db.none('insert into conversations(title)' + 'values($1)', 'test');
    done();
  });
  
  it('should add a SINGLE message on /conversations/messages POST', function(done) {

    chai.request(server)
    .get('/api/conversations')
    .end(function(error, response){
      chai.request(server)
      .post('/api/conversations/' + response.body[0].id + '/messages')
      .send({ "content":"test", 'author': 1, "avatar_img": "test.jpg", "time": Date.now() })
      .end(function(err, res){
        expect(res).to.have.status(200)
        expect(res.body).to.have.status('success')
        done();
      })
    })
  });
  
  it('should list ALL messages on /messages GET', function(done){
    chai.request(server)
      .get('/api/conversations/')
      .end(function(error, response){
        chai.request(server)
        .get('/api/conversations/' + response.body[0].id)
        .end(function(err, res){
          expect(res).to.have.status(200);
          done();
        })
      })
      
  });
  
  // it('should list a SINGLE message on /message/:id GET', function(done) {
  //   chai.request(server)
  //     .get('/api/messages/1')
  //     .end(function(err, res){
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res).to.be.a('object');
  //       expect(res.body).to.have.property('id');
  //       expect(res.body).to.have.property('content');
  //       expect(res.body.content).to.equal('test')
  //       done();
  //     });    
  // });
   
});