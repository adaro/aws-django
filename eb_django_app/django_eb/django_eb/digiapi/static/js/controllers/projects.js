/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['$scope', 'localStorageService', 'DigiService'];

    function TodoCtrl($scope, localStorageService, DigiService) {
        var vm = this
        vm.projects = DigiService.projects;
//        vm.addProject = addProject;
//        vm.keyup = keyup
//        vm.removeProject = removeProject;
//        vm.handle = handle;
//        vm.logout = logout;

        $scope.$watch('vm.todos', function () {
          localStorageService.add('todos', vm.todos);
        }, true);

        function addProject() {
          if (vm.project) {
              console.log(vm.project)
              vm.projects.push(vm.project);
              //TODO: pop up modal form here
//              vm.todo = '';
//              angular.element(document).find('.todo-input').removeClass('is-dirty')
          }

        };

//        function keyup(event) {
//            if (event.keyCode == 13) {
//                addTodo()
//            }
//        }
//
//        function removeProject(index) {
//          vm.todos.splice(index, 1);
//        };
//
//        function handle($file, $message, $flow ) {
//            vm.projects.push( $file )
//        }

//        function logout() {
//            localStorageService.remove('token')
//        }



    }
})();