'use strict';

/**
 * @ngdoc overview
 * @name digiBoardApp
 * @description
 * # digiBoardApp
 *
 * Main module of the application.
 */
angular
  .module('digiBoardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'flow',
    'akoenig.deckgrid'
  ])
  .config(function ($interpolateProvider, $routeProvider, localStorageServiceProvider, flowFactoryProvider) {
  localStorageServiceProvider.setPrefix('ls');
  $interpolateProvider.startSymbol('[[').endSymbol(']]');

//    flowFactoryProvider.defaults = {
//        target: '/upload',
//        permanentErrors:[404, 500, 501]
//    };
    // You can also set default events:
//    flowFactoryProvider.on('catchAll', function (event, item) {
//      console.log(event, item)
//    });


    $routeProvider
      .when('/', {
        templateUrl: static_url + 'views/todo.html',
        controller: 'TodoCtrl',
        resolve: {
          data: function (DigiService) {
            return DigiService
          }
        }
      })
      .when('/about', {
        templateUrl: static_url + 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

