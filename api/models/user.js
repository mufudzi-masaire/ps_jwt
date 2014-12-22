var mongoose = require('mongoose'),
		bcrypt = require('bcrypt-nodejs');


var UserSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true }
});


UserSchema.methods.toJSON = function(){
	var user = this.toObject();
	delete user.password;
	return user;
};


UserSchema.methods.comparePasswords = function(password, callback){
	bcrypt.compare(password, this.password, callback)
};
	

UserSchema.pre('save', function(next){
	var user = this;
	
	// check if password is modified
	if (!user.isModified('password')) return next();
	
	// generate salt and encrypt password
	bcrypt.genSalt(10, function(err, salt){
		if (err) return next(err);
		
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);
			// set hashed password
			user.password = hash;
			next();
		});
	});	
});


module.exports = mongoose.model('User', UserSchema);


