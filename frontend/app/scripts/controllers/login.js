'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, $http, alert, authToken, API_URL) {
    $scope.submit = function(){
			var url = API_URL + '/login'
			var user = {
				email: $scope.email,
				password: $scope.password
			}
			
			$http.post(url, user)
				.success(function(res){
					alert('success', 'Welcome bak ', res.user.email);
					authToken.setToken(res.token);
				})
				.error(function(err){
					alert('warning', "Oops! ", err.message);
				});
		}
  });
