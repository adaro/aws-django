/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['$scope', 'localStorageService', 'DigiService'];

    function TodoCtrl($scope, localStorageService, DigiService) {
        var vm = this
        var todosInStore = localStorageService.get('todos');
        vm.todos = todosInStore || [];
        vm.photos = DigiService.photos;
        vm.addTodo = addTodo;
        vm.keyup = keyup
        vm.removeTodo = removeTodo;
        vm.handle = handle;
        vm.logout = logout;

        $scope.$watch('vm.todos', function () {
          localStorageService.add('todos', vm.todos);
        }, true);

        function addTodo() {
          if (vm.todo) {
              console.log(vm.todo)
              vm.todos.push(vm.todo);
              vm.todo = '';
              angular.element(document).find('.todo-input').removeClass('is-dirty')
          }

        };

        function keyup(event) {
            if (event.keyCode == 13) {
                addTodo()
            }
        }

        function removeTodo(index) {
          vm.todos.splice(index, 1);
        };

        function handle($file, $message, $flow ) {
            vm.photos.push( $file )

        }

        function logout() {
            localStorageService.remove('token')
        }



    }
})();