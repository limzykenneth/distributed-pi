var digit_store = "pi.txt";
var job_duration = 10000;

var fs = require('fs');
var saved_size = fs.statSync(digit_store).size;

var population = saved_size + 1; //this is digit number which can be safely saved to disk
var frontier = (population - 1) / 9;
var queue = {};
var digits = {};

var last_write = 0;

var S = {
};


S.write_digits = function(){
	if(new Date() - last_write < job_duration * 6) return;
	last_write = +new Date();
	var buffer = '';
	while(population in digits){
		buffer += digits[population];
		delete digits[population];
		population += 9;
	}
	if(buffer.length > 0){
		fs.appendFile(digit_store, buffer);
	}
};

S.save_job = function(n, sum, legacy){
	if(n in queue){
		queue[n].time = +new Date();
		queue[n].sum += sum;
		queue[n].legacy = legacy;
		if(legacy === 0){
			digits[n] = (Math.floor((queue[n].sum % 1.0) * 1e9)/1e9).toFixed(9).slice(2);
			delete queue[n];
			console.log('completed digit', n, digits[n], Object.keys(digits).length, "unwritten", Object.keys(queue).length, "queued");
			this.write_digits();
			return this.schedule_job();
		}
	}else{
		return this.schedule_job();
	}
};

S.schedule_job = function(){
	var candidates = Object.keys(queue).map(function(e){
		return queue[e];
	}).filter(function(e){
		return (e.time < +new Date() - job_duration * 3);
	}).sort(function(a, b){
		return a.digit - b.digit;
	});
	if(candidates.length === 0){
		var new_job = {
			digit: (frontier * 9 + 1),
			time: +new Date(),
			sum: 0,
			legacy: 3 //first prime number
		};
		queue[new_job.digit] = new_job;
		frontier++;
		return [new_job.digit, new_job.legacy, job_duration];
	}else{
		candidates[0].time = +new Date();
		return [candidates[0].digit, candidates[0].legacy, job_duration];
	}
};

module.exports = S;