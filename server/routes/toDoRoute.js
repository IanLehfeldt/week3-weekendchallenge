var express = require('express');
var router = express.Router();
var pool = require('../pools/pool.js')

var hello = 'Hello World';

router.post('/', function(req, res){
    console.log(hello);
    res.sendStatus(200)
})

module.exports = router;