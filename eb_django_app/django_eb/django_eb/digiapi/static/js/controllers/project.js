/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('ProjectCtrl', ProjectCtrl);

    ProjectCtrl.$inject = ['$scope', 'DigiService'];

    function ProjectCtrl($scope, DigiService) {
        $scope.projects = DigiService.projects;
        $scope.project = {poster:'/static/img/coffee.jpg'};
        $scope.addProject = addProject
        $scope.show_form = false;

        function addProject() {
            $scope.show_form = true;
            DigiService.create_project()
            $scope.projects.push($scope.project);

        };
    }
})();