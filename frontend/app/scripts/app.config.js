'use strict';

angular.module('psJwtApp').config(function($urlRouterProvider, $stateProvider){
	
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: '/views/main.html',
			controller: 'MainCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: '/views/register.html',
			controller: 'RegisterCtrl'
		});
	
});
