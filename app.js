'use strict'

var cluster 	= require('cluster');
var cacheutil 	= require('./utils/cacheutil.js')
var urlshortner = require('./utils/urlshortner.js')
var config 		= require('./config/config');
var express     = require('express');
var app         = express();
var port 		= config.port || 8080;

if(cluster.isMaster) {
	var numWorkers = require('os').cpus().length * 2;

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

	var router = express.Router();

	router.use(function(req, res, next){
		//middle if we need to do any validation
		next();
	});

	router.route('/')
		.get(function(req, res){
			res.json({ message : 'You seems to be lost!!!'});
		});

	router.route('/makeshort/:vl')
		.get(function(req, res) {
			urlshortner.makeshort(req, function(err, reply){
					if(err){
						console.log('Error');
						res.end();
					}
					res.end(reply);
			});
		})
	
	router.route('/makelong/:ky')
			.get(function(req, res){
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

	app.use('/', router);
	app.listen(port);

	process.on('uncaughtException', function(){
		  	console.log(err);
		  	//Send some notification about the error  
		  	process.exit(1);
  	});
	
}

