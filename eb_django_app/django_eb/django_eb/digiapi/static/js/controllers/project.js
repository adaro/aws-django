/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('ProjectCtrl', ProjectCtrl);

    ProjectCtrl.$inject = ['$scope', 'DigiService', '$state', '$rootScope'];

    function ProjectCtrl($scope, DigiService, $state, $rootScope) {

        // Projects View Controller
        $scope.projects = DigiService.projects;
        $scope.project = {poster:'/static/img/coffee.jpg'};
        $scope.addProject = addProject
        $scope.showLabel = showLabel;
        $scope.createStyle = createStyle;
        $scope.selectProject = selectProject;
        $scope.showForm = showForm;
        $scope.loadTodos = loadTodos;
        $scope.closeProject = closeProject;
        $rootScope.select_project = true;
        $scope.show_form = false;
        $scope.datepicked = false;
        $rootScope.project_view = false;

        DigiService.get_projects().then(function(response) {
            $scope.projects = response.data;
        })

        angular.element('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        function showForm() {
            if (!$rootScope.project_view) {
                $scope.show_form = true;
            }
        }


        function closeProject() {
            $rootScope.project_view = false;
            $scope.show_form = false;
            console.log()
        }

        function selectProject(project, indx) {
            $rootScope.project_id = project.pk
            console.log("here!", $rootScope.project_view)
            $rootScope.project_view = true;
            //TODO: cache these
            $rootScope.project_id_url = 'api/post_photo/' + project.pk
            DigiService.get_project(project.pk).then(function(response) {
                $scope.project = response.data;

            })

            $scope.loadTodos(project)
            DigiService.get_photos( $rootScope.project_id ).then(function(response) {
                $rootScope.photos = response.data
            })
        }

        function loadTodos(project) {
            DigiService.get_todos(project.pk).then(function(response) {
                DigiService.todos = response.data;
                $rootScope.todos = response.data;
            })
        }

        function addProject() {
            $scope.show_form = true;
//            DigiService.create_project()
            $scope.projects.push($scope.project);
        };

        function showLabel() {
            angular.element('.date-label').addClass('remove-label')
        }

        function createStyle(project) {
            return {
                "background":
                    "url(" + "'" + "/static/img/" + project.fields.poster.split("img/")[1] + "'" + ") top right 15% no-repeat "
            }
        }

    }
})();