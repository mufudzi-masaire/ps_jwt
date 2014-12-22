module.exports = function(app){

	var User = require('../models/user'),
			configs = require('../configs/configs'),
			secret = configs.jwt.secret,
			jwtService = require('../services/jwt'),
			jwt = require('jwt-simple');
	
	
	
	app.post('/api/register', function(req, res){
		var user = req.body;
		
		// create user
		var newUser = new User({
			email: user.email,
			password: user.password
		});
				
		// persist object
		newUser.save(function(err){
			if (err) return res.status(501).jsonp(err);
			return jwtService.createSendToken(newUser, res);
		});
		
	});
	
	
	app.post('/api/login', function(req, res){
		var searchUser = {email: req.body.email};	
		User.findOne(searchUser, function(err, user){
			if (err) throw err	
			if (!user) return res.status(401).send({ message: "Wrong email/password!"});							 
			user.comparePasswords(req.body.password, function(err, isMatch){
				if (err) throw err		
				if (isMatch) return jwtService.createSendToken(user, res);	
				if (!isMatch) return res.status(401).send({ message: "Wrong email/password!"});		
			});
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
		
		return res.json(jobs);
	});
	
}
