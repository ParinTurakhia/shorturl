'use strict'

var cache = require('../utils/cacheutil.js')
var crypto = require('crypto');

function makeshort(req, callback) {
	cache.set(crypto.createHash('md5').update(req.params.vl).digest('hex'), req.params.vl, function(err, reply){
			if(err) {
				console.log('Set failed in Redis');
				callback(err, null);
			}
			
			callback(null, crypto.createHash('md5').update(req.params.vl).digest('hex'));

		});
}

function makelong(req, callback) {
	cache.get(req.params.ky, req.params.df, function(err, reply){
			if(err){
				console.log('Get failed from Redis');
				callback(err, null);
			}

			if(reply === null){
				reply = req.params.df;
			}

			callback(null, reply);
	});
}

module.exports = {
	makeshort : makeshort,
	makelong : makelong
}