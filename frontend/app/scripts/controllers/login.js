'use strict';

angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, $state, alert, auth) {
    
		$scope.submit = function(){	
			auth.login($scope.email, $scope.password)
				.success(function(res){
					alert('success', 'Welcome bak ', res.user.email);
					$state.go('main');
				})
				.error(function(err){
					alert('warning', 'Oops! ', err.message);
				});
		}
		
  });
