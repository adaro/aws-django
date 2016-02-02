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
        get_projects: get_projects,
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

    function get_projects() {
        return $http.get('/api/projects')
            .then(get_projects_complete)
            .catch(get_projects_failed);
            }

        function get_projects_complete(response) {
            return response;
        }

        function get_projects_failed(error) {
            logger.error('XHR Failed for getAvengers.' + error.data);
        }


    return digiObj

  }

})();
