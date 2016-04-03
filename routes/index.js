var express = require('express');
var fs = require('fs');
var router = express.Router();
var s = require('../taskScheduler');
var url = require('url');
var PI = require('../writePI.js');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/task', function(req, res) {
	var page = url.parse(req.url, true);
	res.status(200);
	res.set({
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	});

	var data = JSON.parse(page.query.data);

	if(data.length == 3){
		var new_job = s.save_job(Math.floor(data[0]), data[1], data[2]);
		if(new_job){
			res.end(JSON.stringify(new_job));
		}else{
			res.end('[]');
		}
	}else if(data.length === 0){
		res.end(JSON.stringify(s.schedule_job()));
	}
});

router.get('/worker.js', function(req, res){
	res.status(200);
	res.set({
		'Content-Type': 'text/javascript', 
		'Access-Control-Allow-Origin': '*'
	});
	fs.readFile('worker.js', 'utf8', function(err, data){
		if(err) throw err;
		res.end(data.replace('__AUTOINSERT_SCHEDULER__', '//' + req.headers.host + '/task'));
	});
});

router.get('/pi', function(req, res){
	res.status(200);
	res.set({
		'Content-Type': 'text/plain', 
		'Access-Control-Allow-Origin': '*'
	});
	// fs.readFile('./pi.txt', 'utf8', function(err, data){
	// 	if(err) throw err;
	// 	res.end("3." + data);
	// });
	PI.getDigits(function(data){
		res.end("3." + data);
	});
});


module.exports = router;