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

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

    function config($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        $urlRouterProvider.otherwise('/');

        $stateProvider.
            state('landing', {
                url: '/',
                templateUrl: static_url + 'views/todo.html',
                controller: 'TodoCtrl as vm'
            }).
            state('login', {
                url: '/api/login',
                templateUrl: static_url + 'views/login.html',
                controller: 'LoginCtrl as vm'
            }).
            state('logout', {
                url: '/api/logout',
                templateUrl: static_url + 'views/login.html',
                controller: 'LoginCtrl as vm'
            })
    }

}());