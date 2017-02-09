var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require('../server');
var expect = chai.expect;
var db = require("../db").init;

chai.use(chaiHttp);

describe("Clear conversations...", function(done) {
  
  beforeEach(function(done){
    db.none('TRUNCATE conversations RESTART IDENTITY');
    done();
  });
  
  it('should not see data', function(done) {
    db.any('select * from conversations')
    .then(function(data){
      expect(data).to.deep.equal([]);
      }).then(done, done);
  });
});

describe('Conversations', function() {
  
  it('should add a SINGLE conversation on /conversations POST', function(done){
    chai.request(server)
    .post('/api/conversations')
    .send({'title': 'new'})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.status('success');
      done();
    })
  })
  it('should list ALL conversations on /conversations/active GET', function(done){
    chai.request(server)
      .get('/api/conversations')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0]).to.have.property('id');
        expect(res.body[0]).to.have.property('title');
        expect(res.body[0].title).to.equal('new')
        done();
      });
  });
  
  it.skip('should update a SINGLE conversation on /conversations/:id PUT', function(done) {
    chai.request(server)
    .put('/api/conversations/1')
    .send({"password":"1111111111"})
    .end(function(err, res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.status('success');
      done();
    });
  });
  
  it('should list a SINGLE conversation on /conversation/:id GET', function(done) {
    chai.request(server)
    .get('/api/conversations/')
    .end(function(error, response){
      chai.request(server)
      .get('/api/conversations/' + response.body[0].id)
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res.body).to.have.property('id');
        done()
      })
    })
  });
   
  it('should delete a SINGLE conversation on /conversations/:id DELETE', function(done) {
    chai.request(server)
      .get("/api/conversations/")
      .end(function(error, response) {
        chai.request(server)
          .delete("/api/conversations/" + response.body[0].id )
          .end(function(err, res){
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.status('success');
            done();
          });
      });
}); 
})