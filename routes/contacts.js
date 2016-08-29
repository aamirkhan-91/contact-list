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

module.exports = router;
