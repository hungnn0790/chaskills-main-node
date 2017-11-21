process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let shoud = chai.should();

chai.use(chaiHttp);

describe('User', () => {
	let testUsers = [{
		'email': 'test@gmail.com',
		'first_name': 'test',
		'password': '123456'
	}]

	beforeEach((done) => {
		User.remove({}, (err) => {
			done();
		});
	});

	describe('/POST Sign up user', () => {
		it('it should sign up new user', (done) => {
			chai.request(server)
				.post('/auth/signup')
				.send(testUsers[0])
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});
});