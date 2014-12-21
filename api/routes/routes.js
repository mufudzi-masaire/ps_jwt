module.exports = function(app){

	var User = require('../models/user'),
			configs = require('../configs/configs'),
			secret = configs.jwt.secret,
			jwt = require('jwt-simple');
	
	app.post('/api/register', function(req, res){
		var user = req.body;
		
		// create user
		var newUser = new User.model({
			email: user.email,
			password: user.password
		});
		
		
		// JWT PAYLOAD
		var payload = {
			iss: req.hostname,
			sub: newUser.id
		}
		
		// JWT TOKEN
		var token = jwt.encode(payload, secret);
		
		// persist object
		newUser.save(function(err){
			if (err) return res.status(501).jsonp(err);
			res.status(200).send({ user: newUser.toJSON(), token: token });
		});
		
	});
	
	
	
	var jobs =['Cook', 'SuperHero', 'Unicorn Whisperer', 'Toast Master'];
	
	app.get('/api/jobs', function(req, res){
		
		if (!req.headers.authorization){
			return res.status(401).send({
				message: "You are not authorized!"
			});
		}
		
		var token = req.headers.authorization.split(' ')[1];		
		var payload = jwt.decode(token, secret);
		
		if (!payload.sub){
			return res.status(401).send({
				message: "Authentication failed."
			})
		}
		
		res.json(jobs);
	});
	
}