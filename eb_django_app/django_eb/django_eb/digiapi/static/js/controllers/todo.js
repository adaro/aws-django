/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('TodoCtrl', TodoCtrl);

    TodoCtrl.$inject = ['$scope', 'localStorageService', 'DigiService', '$rootScope', 'UtilsService'];

    function TodoCtrl($scope, localStorageService, DigiService, $rootScope, UtilsService) {
        var vm = this
        var todosInStore = localStorageService.get('todos'); // local storage if we need it
        var utils = UtilsService; // TODO: put this on $scope eventually when we add it to the view
        $rootScope.todos = DigiService.todos;
        vm.todo = {title:null, detail:null, date:null, status:null, priority:null, index:null};
        vm.photos = DigiService.photos;
        vm.addTodo = addTodo;
        vm.keyup = keyup
        vm.removeTodo = removeTodo;
        vm.handle = handle;
        vm.logout = logout;

        $scope.$watch('todos', function () {
//          localStorageService.add('todos', vm.todos);
        }, true);

        //TODO: need to track index when dragged and dropped
        function addTodo() {
          console.log(vm.todo)
          if (vm.todo) {
              $rootScope.todos.push({priority:"H" ,status:"P" ,detail: vm.todo.detail, title: vm.todo.title, index: 1});
              //TODO: have todo view toggle set the priority and status
              DigiService.post_todo(vm.todo, $rootScope.project_id)
              vm.todo = '';
              // Hack
              var a = document.querySelectorAll('.todo-input')
              console.log(a)
              angular.element(a[0]).removeClass('is-focused')
          }
        };

        //TODO: this fires our createStyle for some reason
        function keyup(event) {
            if (event.keyCode == 13) {
                addTodo()
            }
        }

        //TODO: Get all of the todo logic and templating into a directive
        function removeTodo(index) {
          var todo = $rootScope.todos[index];
          DigiService.delete_todo($rootScope.project_id, todo);
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