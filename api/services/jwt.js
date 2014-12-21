var configs = require('../configs/configs'),
		crypto = require('crypto');


exports.encode = function(payload){
	var algorithm = 'HS256';
	var header = {typ: 'JWT', alg: algorithm };
	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
	jwt += '.' + sign(jwt);	
	return jwt;
}

function base64Encode(str){
	return new Buffer(str).toString('base64');
}

function sign(str){
	var key = configs.jwt.secret;
	return crypto.createHmac('sha256', key).update(str).digest('base64');
}