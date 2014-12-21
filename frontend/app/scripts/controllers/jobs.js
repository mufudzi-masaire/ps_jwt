'use strict';

/**
 * @ngdoc function
 * @name psJwtApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the psJwtApp
 */
angular.module('psJwtApp')
  .controller('JobsCtrl', function ($scope, $http, alert, API_URL) {
   
		$http.get(API_URL + '/jobs')
			.success(function(allJobs){
				$scope.jobs = allJobs;
			})
			.error(function(err){
				alert('warning', 'Unable to get jobs ', err.message);
			});
  });
