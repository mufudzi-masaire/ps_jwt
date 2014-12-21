'use strict';

angular.module('psJwtApp').controller('RegisterCtrl', function ($scope, $rootScope, $http, $state, alert, authToken, API_URL) {  
	
	$scope.submit = function(){	
		var url = API_URL + '/register';
		var user = {
			email: $scope.email,
			password: $scope.password
		};
		
		$http.post(url, user)
			.success(function(data){
				alert('success', 'Account Created! ', 'Welcome, ' + data.user.email + ' !');
				authToken.setToken(data.token);
				$state.go('main');
			})
			.error(function(err){
				alert('warning', 'Opps!', 'Could not register.');
			})
	}

	
 });
