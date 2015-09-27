/**
 * Created on 9/26/15.
 */

var seedControllers = angular.module('seedControllers', []);

seedControllers.controller('seedIndexController', ['$scope', function($scope) {

	$scope.greetings = 'hello seedIndexController!';
}]);

seedControllers.controller('seedTestController', ['$scope', function($scope) {

	$scope.test = 'hello seedTestController!';
}]);

