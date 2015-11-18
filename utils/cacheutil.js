var Redis = require('ioredis');
var config = require('../config/config');
var redis = new Redis(config.redisport, config.redisip);


function set(key, value, callback) {

	redis.set(key, value, function(err, reply){
			if(err) {
				callback(err, null);
				return;
			}

			callback(null, reply);
			return;

	});
}

function get(key, deflautValue, callback) {

	redis.get(key, function(err, reply){
			if(err) {
				callback(err, null);
				return;
			}

			if(reply == null) {
				reply = deflautValue;
			}
			
			callback(null, reply);
			return;

	});
}

module.exports = {
	set : set ,
	get : get
}