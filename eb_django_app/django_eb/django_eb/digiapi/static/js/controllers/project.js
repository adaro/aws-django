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
        $scope.showLabel = showLabel;
        $scope.show_form = false;
        $scope.datepicked = false;

          angular.element('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
          });

        function addProject() {
            $scope.show_form = true;
            DigiService.create_project()
            $scope.projects.push($scope.project);
        };

        function showLabel() {
            angular.element('.date-label').addClass('remove-label')
        }
    }
})();