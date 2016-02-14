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
        todos: [],
        get_projects: get_projects,
//        get_photos: get_photos,
        login_error: "",
        login: login,
        post_photos: post_photos,
        post_todo: post_todo
            }


    function login() {
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
        }

    function set_error(error) {
        digiObj.login_error = error;
    }

    function post_photos(file, id) {

        var fd = new FormData();
            fd.append('file', file);
            $http.post("api/post_photo/" + id, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                get_projects( $rootScope.project_id )
            })
            .error(function(){
            });

    }

    function post_todo(detail, priority, status, id) {

        var fd = new FormData();
            fd.append('detail', detail);
            fd.append('priority', priority);
            fd.append('status', status);

            $http.post("api/post_todo/" + id, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                get_photos( $rootScope.project_id )
            })
            .error(function(){
            });

    }


    //GET response for all functions
    function get_complete(response) {
        return response;
    }

    //GET PROJECTS

    function get_projects(project_id) {
        var url = '/api/projects'
        console.log(project_id)
        if (project_id) {
            url = '/api/projects/' + project_id
        }
        return $http.get(url)
            .then(get_complete)
            .catch(get_projects_failed);
    }


    function get_projects_failed(error) {
        console.log('XHR Failed for get_projects.' + error.data);
    }

    //GET PHOTOS

//    function get_photos(id) {
//        return $http.get('/api/photos/' + id)
//            .then(get_complete)
//            .catch(get_photos_failed);
//    }
//
//    function get_photos_failed(error) {
//        console.log('XHR Failed for get_photos.' + error.data);
//    }

    return digiObj

  }

})();
