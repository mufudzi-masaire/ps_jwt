'use strict';

angular.module('psJwtApp')
  .controller('LoginCtrl', function ($scope, alert, auth) {
    
		$scope.submit = function(){	
			auth.login($scope.email, $scope.password)
				.success(function(res){
					alert('success', 'Welcome bak ', res.user.email);
				})
				.error(function(err){
					alert('warning', 'Oops! ', err.message);
				});
		}
		
  });
