(function () {
    'use strict';

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
        'akoenig.deckgrid',
        'ui.router'
      ])
      .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $locationProvider.html5Mode(
            {
              enabled: true,
              requireBase: false
            }
        );


        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('landing', {

                url: '/',
                templateUrl: static_url + 'views/todo.html',
                controller: 'TodoCtrl',
                controllerAs: 'vm'

            }).
            state('login', {
                url: '/api/login',
                templateUrl: static_url + 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'

            }).
            state('logout', {
                url: '/api/logout',
                templateUrl: static_url + 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
    }

}());