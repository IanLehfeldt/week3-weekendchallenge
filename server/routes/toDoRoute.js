var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    console.log('To do get router was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM todolist;',
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making Query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});

router.post('/', function (req, res) {
    console.log('To do router was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to DB failed!
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //when connecting to DB worked!
            client.query('INSERT INTO todolist ("toDoItem", "completed") VALUES ($1, \'N\');', [req.body.toDo],
                function (errorMakingQuery, result) {
                    done(); //If you dont do this, all the pool connections will still be outside of the pool. You need to say done(); to return each connection to the pool for other users
                    if (errorMakingQuery) {
                        console.log('Error making Query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});

router.put('/:id', function (req, res){
    console.log('To Do put method was hit!');
    pool.connect( function (errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase){
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('UPDATE todolist SET completed = \'Y\' WHERE id = $1;', [req.params.id], function (errorMakingQuery, result){
                done();
                if (errorMakingQuery){
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.delete('/:id', function (req, res) {
	console.log('todo delete was hit');
	pool.connect(function (errorConnectingToDatabase, client, done) {
		if (errorConnectingToDatabase) {
			console.log('Error connecting to database', errorConnectingToDatabase);
			res.sendStatus(500);
		} else {
			client.query('DELETE FROM todolist WHERE id=$1;', [req.params.id], function (errorMakingQuery, result) {
				done();
				if (errorMakingQuery) {
					console.log('Error making query', errorMakingQuery);
					res.sendStatus(500);
				} else {
					res.sendStatus(200);
				}
			});
		}
	});
});

module.exports = router;