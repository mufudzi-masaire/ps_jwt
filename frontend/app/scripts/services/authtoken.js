'use strict';

angular.module('psJwtApp')
  .factory('authToken', function ($window) {
	
    var storage = $window.localStorage;
		var cachedToken;
		var userToken = 'userToken';

    var authToken = {
			
			setToken: function(token){
				cachedToken = token;
				storage.setItem(userToken, token);
			},		
			getToken: function(){	
				if (!cachedToken){
					cachedToken = storage.getItem(userToken);
				}
				return cachedToken;
			},		
      isAuthenticated: function(){
				console.log("auth");
				return !!authToken.getToken();	
			},		
			removeToken: function(){
				console.log("log out");
				cachedToken = null;
				storage.removeItem(userToken)
			}
			
    }	
		return authToken;
	
  });
