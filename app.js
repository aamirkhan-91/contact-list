var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var contacts = require('./routes/contacts')(express);
require('mongoose').connect("mongodb://localhost/contactlist");

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.get('/', function(req, res)
{
    res.render('index');
});
app.use('/contacts', contacts);
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(80);
console.log("Listening on port 80...")
