var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var toDoRoute = require('./routes/toDoRoute.js')
//var router = require('./routes/');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('server/public'));

app.use('/toDoRoute', toDoRoute)

app.listen(port, function(){
    console.log('Currently listening to port:', port);
})