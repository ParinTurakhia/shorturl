var should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest'),
api = supertest('http://localhost:8000');

describe('API test for makeshort and makelong', function(){
	it('should return 200 status code', function(done){
		api.get('/')
		.set('Accept', 'application/json')
		.expect(200, done);
	});

	it('Get short code', function(done){
		api.get('/makeshort/https%3A%2F%2Frpm.newrelic.com%2Faccounts%2F206830%2Fapplications%2F1065260')
		.set('Accept', 'application/json')
		.expect(200, done);
	});

	it('Long URL', function(done){
		api.get('/makelong/2a90f91ea77879b649f0bafcb4f35c2e')
		.set('Accept', 'application/json')
		.expect(302, done);
	});
})