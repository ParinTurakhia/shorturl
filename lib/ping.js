var pingIP = require ("ping");


/* Ping Constructor */
function Ping(opts) {
	this.website = '';
	this.timeout = 15;
	this.handle  = null;

	this.init(opts);
}

/* Methods */
Ping.prototype = {
	init : function(opts) {
		var self = this;
		self.website = opts.website;
		self.timeout = opts.timeout; 

		//start monitoring
		self.start();
	},

	start : function() {
		var self = this,
		   time = Date.now();


		console.log("\nPing... " + self.website + "\nTime: " + time + "\n");
		
		self.handle = setInterval(function (){
			self.ping();
		}, self.timeout)  
	},

	ping: function () {
		var self = this;

		try {
		  	pingIP.sys.probe(self.website, function(isAlive){
    			
    			
    			if(isAlive) {
    				self.isOk();	
    			}
    			else{
    				self.isNotOk();
    			}


    	  	});
		}
		catch (err) {
			console.log(err)
		}
	},

	isOk: function() {
		this.log('UP', 'OK');
	},

	isNotOk : function (statusCode) {
		  var time =  Date.now(),
            self = this,
            time = self.getFormatedDate(time),
            msg = "",//statusCodes[statusCode + ''],
            
            htmlMsg = '<p>Time: ' + time;
            htmlMsg +='</p><p>IP: ' + self.website;
            htmlMsg += '</p><p>Message: ' + msg + '</p>';
        	
        	this.log('DOWN', msg);
	},

	log: function (status, msg) {
        var self = this,
            time = Date.now(),
            output = '';
        output += "\nIP: " + self.website;
        output += "\nTime: " + time;
        output += "\nStatus: " + status;
        output += "\nMessage:" + msg  + "\n";
        console.log(output);
    },

    getFormatedDate: function (time) {
        var currentDate = new Date(time);
        currentDate = currentDate.toISOString();
        currentDate = currentDate.replace(/T/, ' ');
        currentDate = currentDate.replace(/\..+/, '');
        return currentDate;
    },

    stop: function () {
    	clearInterval(this.handle);
    	this.handle = null;       
	}
}

module.exports = Ping;		