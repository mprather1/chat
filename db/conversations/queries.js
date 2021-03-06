var db = require("../init");

function getAllConversations(req, res, next){
  db.any('select * from conversations')
  .then(function(data){
    res.status(200)
      .json(data);
  });
}

function getSingleConversation(req, res, next){
  var conversationID = parseInt(req.params.id);
  db.one('select * from conversations where id = $1', conversationID)
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function createConversation(req, res, next){
  db.none('insert into conversations( title )' + 'values( ${title} )', req.body)
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one conversation'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

function removeConversation(req, res, next){
  var conversationID = parseInt(req.params.id);
  db.result('delete from conversations wher id = $1', conversationID)
  .then(function(data){
    res.status(200)
    .json({
      status: 'success',
      message: `Removed ${data.rowCount} conversation`
    });
  });
  
}

module.exports = {
  getAllConversations: getAllConversations,
  getSingleConversation: getSingleConversation,
  createConversation: createConversation,
  removeConversation: removeConversation
};