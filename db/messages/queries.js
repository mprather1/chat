var db = require("../init");

function getAllMessages(req, res, next){
  db.any('select * from messages')
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function getSingleMessage(req, res, next){
  var messageID = parseInt(req.params.id);
  db.one('select * from messages where id = $1', messageID)
  .then(function(data){
    res.status(200)
    .json(data);
  })
  .catch(function(err){
    return next(err);
  });
}

function createMessage(req, res, next){
  db.none('insert into messages(content, author)' + 'values(${content}, ${author})', req.body)
  .then(function(){
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted ONE message'
    });
  })
  .catch(function(err){
    return next(err);
  });
}


module.exports = {
  getAllMessages: getAllMessages,
  getSingleMessage: getSingleMessage,
  createMessage: createMessage
}