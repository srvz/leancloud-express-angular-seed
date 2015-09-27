/**
 * Created on 9/26/15.
 */

var seedApp = angular.module('seedApp', ['ngRoute', 'seedControllers']);

var indexTemplate = require('../jade/index_body.jade');
var testTemplate = require('../jade/test_body.jade');

seedApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		template: indexTemplate,
		controller: 'seedIndexController'
	}).when('/test', {
		template: testTemplate,
		controller: 'seedTestController'
	}).otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
}]);

