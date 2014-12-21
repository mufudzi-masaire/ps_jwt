var configs = require('../configs/configs'),
		crypto = require('crypto');


exports.encode = function(payload){
	var algorithm = 'HS256';
	var header = {typ: 'JWT', alg: algorithm };
	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
	jwt += '.' + sign(jwt);	
	return jwt;
}

exports.decode = function(token){
	var segments = token.split('.');
	
	if (segments.length !== 3){
		throw new Error("Token structure incorrect");
	}
	
	var header = JSON.parse(base64Decode(segments[0]));
	var payload = JSON.parse(base64Decode(segments[1]));
	
	var rawSignature = segments[0] + '.' + segments[1];
	
	if (!verify(rawSignature, segments[2])){
		throw new Error("Verification failed");
	}
	
	return payload;
}

function base64Encode(str){
	return new Buffer(str).toString('base64');
}

function base64Decode(str){
	return new Buffer(str, 'base64').toString();
}

function sign(str){
	var key = configs.jwt.secret;
	return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function verify(raw, signature){
	return signature == sign(raw);
}