module.exports = function(app){

	var User = require('../models/user'),
			jwt = require('../services/jwt');
	
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
			sub: user._id
		}
		
		// JWT TOKEN
		var token = jwt.encode(payload);
		
		// persist object
		newUser.save(function(err){
			if (err) return res.status(501).jsonp(err);
			res.status(200).send({ user: newUser.toJSON(), token: token });
		});
		
	});
	
	
	
	var jobs =['Cook', 'SuperHero', 'Unicorn Whisperer', 'Toast Master'];
	
	app.get('/api/jobs', function(req, res){
		
		if (!req.headers.authorization){
			return res.status(401).send({message: "You are not authorized!"});
		}
		res.json(jobs);
	});
	
}