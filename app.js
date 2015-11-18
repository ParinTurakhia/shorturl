var cluster = require('cluster');
var cacheutil = require('./utils/cacheutil.js')
var urlshortner = require('./utils/urlshortner.js')

if(cluster.isMaster) {
	var numWorkers = require('os').cpus().length;

	console.log('Master cluster setting up ' + numWorkers + ' workers...');

	for (var i = 0; i < numWorkers; i++) {
		cluster.fork();
	};

	cluster.on('online', function(worker){
		console.log('Worker ' + worker.process.pid + ' is online');
	});

	cluster.on('exit', function(worker, code, signal){
		console.log('Wroker' + worker.process.pid + ' died with code : ' + code + ', and signal : ' + signal);
		console.log('Starting a new worker');
		cluster.fork();
	});
}else {

	var app = require('express')();
	
	app.get('/makeshort', function(req, res){
		urlshortner.makeshort(req, function(err, reply){
				if(err){
					console.log('Error');
					res.end();
				}
				res.end(reply);
		});
	});

	app.get('/makelong', function(req, res){
		urlshortner.makelong(req, function(err, reply){
				if(err){
					console.log('Error');
					res.end();
				}

				if(reply != null && reply != "") {
					res.status(401).redirect(reply);
				}
				
				res.end("Redirect URL Blank!!!");
		});
	})

	var server = app.listen(8000, function(){
		console.log('Process ' + process.pid + ' is listening to all incoming requests');
	})
}

