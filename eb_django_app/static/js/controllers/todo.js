'use strict';

angular.module('digiBoardApp')
  .controller('TodoCtrl', function ($scope, localStorageService, data) {
    var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];
    $scope.photos = []

    $scope.$watch('todos', function () {
      localStorageService.add('todos', $scope.todos);
    }, true);

    // Uncomment if you are disabling persistence
//    $scope.todos = [];

    $scope.addTodo = function () {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };

    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };

    $scope.handle = function($file, $message, $flow ) {
        console.log($file.file)
        $scope.photos.push( $file )

    }

  });