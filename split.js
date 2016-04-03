var fs = require('fs');
var mysql = require('mysql');
var _ = require('lodash');

var connection = mysql.createConnection({
  host     : process.env.mysql_host,
  user     : process.env.mysql_user,
  password : process.env.mysql_password,
  database : 'distributed_pi',
  bigNumberStrings: true,
  supportBigNumbers: true
});

var result;

fs.readFile('./pi.txt', 'utf8', function(err, data){
	if(err) throw err;

	result = data.match(/.{1,8}/g);
	console.log(result.length);

	// var write = result.join();
	// // console.log(write);
	// fs.writeFile('./pi.csv', write, function(err) {
	// 	if(err) throw err;
	// });

	_.each(result, function(data){
		writeDigits(parseInt(data));
	});
});

var writeDigits = function(d){
	var timestamp = new Date().getTime();
	var query = "INSERT INTO pi_value (digits, timestamp) VALUES('";
		query+= d;
		query+= "','";
		query+= timestamp;
		query+= "')";

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		console.log("Success!");
	});
};