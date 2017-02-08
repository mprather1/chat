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

describe('Users', function() {
  
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
})