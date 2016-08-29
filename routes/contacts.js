var express = require('express');
var router = express.Router();

var mongo = require('mongojs');
var db = mongo('contactlist', ['contactlist']);

router.get('/', function(req, res)
{
  console.log("Received GET /contacts");

  db.contactlist.find(function(err, docs)
  {
    console.log(docs);
    res.json(docs);
  });
});

router.post('/', function(req, res)
{
  console.log('Received POST /contacts');
  console.log(req.body);

  db.contactlist.insert(req.body, function(err, doc)
  {
    res.json(doc);
  });
});

router.delete('/:id', function(req, res)
{
  console.log('DELETE /contacts/' + req.params.id);

  db.contactlist.remove({_id: mongo.ObjectId(req.params.id)}, function(err, doc)
  {
    res.json(doc);
  });
});

module.exports = router;
