module.exports = function(app){

	var User = require('../models/user');
	
	app.post('/api/register', function(req, res){
		var user = req.body;
		
		// create user
		var newUser = new User.model({
			email: user.email,
			password: user.password
		});
		
		// persist object
		newUser.save(function(err){
			if (err) return res.status(501).jsonp(err);
			res.status(200).send(newUser.toJSON());
		});
		
	});
	
}