var _ = require('lodash');
var mysql = require('mysql');

var writePI = writePI || {};


var connection = mysql.createConnection({
  host     : process.env.mysql_host,
  user     : process.env.mysql_user,
  password : process.env.mysql_password,
  database : 'heroku_ec0aa19ecb8e433',
  bigNumberStrings: true,
  supportBigNumbers: true
});

writePI.getDigits = function(callback){
	var str = "";

	connection.query('SELECT * FROM pi_value', function(err, rows, fields) {
		if (err) {
			if (err.code == 'PROTOCOL_CONNECTION_LOST'){
				connection = mysql.createConnection({
				  host     : process.env.mysql_host,
				  user     : process.env.mysql_user,
				  password : process.env.mysql_password,
				  database : 'heroku_ec0aa19ecb8e433',
				  bigNumberStrings: true,
				  supportBigNumbers: true
				});
			}else{
				throw err;
			}
		}
		var sorted = _.sortBy(rows, function(o){
			return o.timestamp;
		});

		_.each(sorted, function(value){
			str += value.digits;
		});
		if(typeof callback === "function"){
			callback(str, callback);
		}else{
			console.log("Callback not function!");
			return;
		}
	});
};

writePI.writeDigits = function(d){
	// Would need to change this
	var timestamp = new Date().getTime();
	var query = "INSERT INTO pi_value (digits, timestamp) VALUES('";
		query+= d;
		query+= "','";
		query+=timestamp;
		query+="')";

	connection.query(query, function(err, rows, fields) {
		if (err) {
			if (err.code == 'PROTOCOL_CONNECTION_LOST'){
				connection = mysql.createConnection({
				  host     : process.env.mysql_host,
				  user     : process.env.mysql_user,
				  password : process.env.mysql_password,
				  database : 'heroku_ec0aa19ecb8e433',
				  bigNumberStrings: true,
				  supportBigNumbers: true
				});
			}else{
				throw err;
			}
		}
		console.log("Success!");
	});
};

// writePI.writeDigits(Math.random()*8999+1000);
// writePI.getDigits(function(str){
// 	console.log("string", str);
// });

module.exports = writePI;