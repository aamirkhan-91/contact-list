var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
var contacts = require('./routes/contacts');

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/contacts', contacts);

app.listen(80);
console.log("Listening on port 80...")
