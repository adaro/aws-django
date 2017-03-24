/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['$scope', 'localStorageService', 'DigiService', '$rootScope', 'UtilsService'];

    function TodoCtrl($scope, localStorageService, DigiService, $rootScope, UtilsService) {
        var vm = this
        var todosInStore = localStorageService.get('todos');
        var utils = UtilsService; // TODO: put this on $scope eventually when we add it to the view
        $rootScope.todos = DigiService.todos; // TODO: this is a nice local storage option leaving it in here :) //todosInStore || [];
        vm.todo = '';
        vm.photos = DigiService.photos;
        vm.addTodo = addTodo;
        vm.keyup = keyup
        vm.removeTodo = removeTodo;
        vm.handle = handle;
        vm.logout = logout;

        $scope.$watch('todos', function () {
//          localStorageService.add('todos', vm.todos);
        }, true);


        function addTodo() {
          if (vm.todo) {
              $rootScope.todos.push(vm.todo);
              //TODO: have todo view toggle set the priority and status
              DigiService.post_todo(vm.todo, "H", "P", $rootScope.project_id)
              vm.todo = '';
              angular.element(document).find('.todo-input').removeClass('is-dirty')
          }
        };

        //TODO: get this into a directive
        function keyup(event) {
            if (event.keyCode == 13) {
                addTodo()
            }
        }

        //TODO: Get all of the todo logic and templating into a directive
        function removeTodo(index) {
          $rootScope.todos.splice(index, 1);

        };

        function handle($file, $message, $flow ) {
            vm.photos.push( $file )
        }

        function logout() {
            localStorageService.remove('token')
        }
    }
})();