/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['$scope', 'localStorageService', 'DigiService', '$rootScope'];

    function TodoCtrl($scope, localStorageService, DigiService, $rootScope) {
        var vm = this
        var todosInStore = localStorageService.get('todos');
        $rootScope.todos = DigiService.todos; // TODO: this is a nice local storage option leaving it in here :) //todosInStore || [];
        vm.photos = DigiService.photos;
        vm.addTodo = addTodo;
        vm.keyup = keyup
        vm.removeTodo = removeTodo;
        vm.handle = handle;
        vm.logout = logout;

        $scope.$watch('vm.todos', function () {
            console.log("here?")
//          localStorageService.add('todos', vm.todos);
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