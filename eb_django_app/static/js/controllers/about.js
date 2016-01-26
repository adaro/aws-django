'use strict';

/**
 * @ngdoc function
 * @name digiBoardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the digiBoardApp
 */
angular.module('digiBoardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
