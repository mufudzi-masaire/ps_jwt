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
	
}