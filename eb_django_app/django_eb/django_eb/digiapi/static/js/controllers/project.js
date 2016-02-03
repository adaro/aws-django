/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('ProjectCtrl', ProjectCtrl);

    ProjectCtrl.$inject = ['$scope', 'DigiService', '$state'];

    function ProjectCtrl($scope, DigiService, $state) {



        // Projects View Controller
        $scope.projects = DigiService.projects;
        $scope.project = {poster:'/static/img/coffee.jpg'};
        $scope.addProject = addProject
        $scope.showLabel = showLabel;
        $scope.createStyle = createStyle;
        $scope.selectProject = selectProject;
        $scope.select_project = true;
        $scope.show_form = false;
        $scope.datepicked = false;
        $scope.project_view = false;



        DigiService.get_projects().then(function(response) {
            $scope.projects = response.data;
        })

        angular.element('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        function selectProject(project, indx) {
            DigiService.get_project(project.pk).then(function(response) {
                $scope.project = response.data;
                $scope.project_view = true;
            })
        }

        function addProject() {
            $scope.show_form = true;
            DigiService.create_project()
            $scope.projects.push($scope.project);
        };

        function showLabel() {
            angular.element('.date-label').addClass('remove-label')
        }

        function createStyle(project) {
            return {
                "background":
                    "url(" + "'" + "/static/img/" + project.fields.poster.split("img/")[1] + "'" + ") bottom right 15% no-repeat #40c4ff"
            }
        }

    }
})();