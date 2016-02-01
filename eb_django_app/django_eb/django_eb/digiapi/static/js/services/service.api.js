/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .factory('DigiService', DigiService);

    DigiService.$inject = ['$rootScope', '$http', 'UserService', '$state', 'localStorageService'];

    function DigiService($rootScope, $http, UserService, $state, localStorageService) {

    var digiObj = {
        photos: [],
        login_error: "",
        login: function() {
                $http.post('/api/login', { username: UserService.username, password: UserService.password })
                    .success(function (response) {
                        if (response.login_error) {
                            $state.go('login')
                            set_error( response.login_error)
                        }
                        else {
                        console.log(response.token, "response token")
                            localStorageService.set('token', response.token)
                            $state.go('landing')
                        }
                    })
                    .error(function(response) {
                        console.log(response)
                    })
                },
            }

    function set_error(error) {
        digiObj.login_error = error;
    }


    return digiObj

  }

})();
