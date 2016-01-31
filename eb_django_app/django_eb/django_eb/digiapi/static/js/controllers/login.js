/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'DigiService', 'UserService', 'localStorageService', '$state'];

    function LoginCtrl($scope, DigiService, UserService, localStorageService, $state) {

        var vm = this
        vm.user = UserService
        vm.login = login

        function login() {
            var token = localStorageService.get('token');
            if (!token) {
                DigiService.login()
            }
            else {
                console.log("Authenticated!")
                $state.go('landing')
            }
        }
    }
})();
