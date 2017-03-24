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
        post_todo: post_todo,
        delete_todo: delete_todo
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
        //TODO: refactor this and post_todo into 1 func
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

    function post_todo(todo_item, id) {

        var fd = new FormData();
            fd.append('title', todo_item.title);
            fd.append('detail', todo_item.title);

            fd.append('priority', todo_item.priority);
            fd.append('status', todo_item.status);
            fd.append('index', todo_item.index);

            $http.post("api/post_todo/" + id, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
//                get_photos( $rootScope.project_id )
            })
            .error(function(){
            });

    }


    function delete_todo(id, todo) {
        console.log(todo)
        $http.delete("api/delete_todo/" + id + '/' + todo.index)
        .success(function(){
//                get_photos( $rootScope.project_id )
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
