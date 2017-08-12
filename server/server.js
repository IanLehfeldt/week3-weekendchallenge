var express = require('express');
var bodyParser = require('body-parser');
var toDoRoute = require('./routes/toDoRoute.js')

var app = express();
var port = 5000;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/toDoRoute', toDoRoute);


app.listen(port, function(){
    console.log('Currently listening to port:', port);
})