/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'DigiService', 'UserService','localStorageService', '$state'];

    function LoginCtrl($scope, DigiService, UserService, localStorageService, $state) {

        var vm = this
        vm.user = UserService
        vm.login = login
        vm.logout = logout;
        vm.login_error = DigiService.login_error

        var token = localStorageService.get('token');
        if (token) {
            $state.go('landing')
        }

        function login() {
            DigiService.login()
        }

        function logout() {

            localStorageService.remove('token')
        }
    }
})();
