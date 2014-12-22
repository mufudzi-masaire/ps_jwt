'use strict';

/**
 * @ngdoc service
 * @name psJwtApp.auth
 * @description
 * # auth
 * Service in the psJwtApp.
 */
angular.module('psJwtApp')
  .service('auth', function ($http, $state, API_URL, authToken) {		
		
		var loginUrl = API_URL + '/login';
		var registerUrl = API_URL + '/register';
		
		
		this.login = function (email, password){
			return $http.post(loginUrl, { 
				email: email, 
				password: password 
			}).success(authSuccess);
		}
		
	
		this.register = function(email, password){
			return $http.post(registerUrl, { 
					email: email, 
					password: password 
				}).success(authSuccess);
		}
		
		//PRIVATE METHODS
		
		function authSuccess(res){
			authToken.setToken(res.token);
			$state.go('main');
		}
		
  });
