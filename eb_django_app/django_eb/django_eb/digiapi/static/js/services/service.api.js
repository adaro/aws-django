/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .factory('DigiService', DigiService);

    DigiService.$inject = ['$rootScope', '$http', 'UserService', '$state'];

    function DigiService($rootScope, $http, UserService, $state) {

    return {
        photos: [],
        login: function() {
            $http.post('/api/login', { username: UserService.username, password: UserService.password })
                .success(function (response) {
                    $state.go('landing')

                })
                .error(function(response) {
                    console.log(response)
                })

        },

    }

  }

})();
