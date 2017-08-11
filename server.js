var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var router = require('./router/..');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

app.listen(port, function(){
    console.log('Currently listening to port:', port);
    
})