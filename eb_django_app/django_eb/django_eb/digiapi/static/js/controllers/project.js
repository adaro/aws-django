/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .controller('ProjectCtrl', ProjectCtrl);

    ProjectCtrl.$inject = ['$scope', 'DigiService', '$state', '$rootScope', 'UtilsService'];

    function ProjectCtrl($scope, DigiService, $state, $rootScope, UtilsService) {

        // Projects View Controller
        // TODO: cleanup var names
        $scope.projects = DigiService.projects;
        $scope.addProject = addProject
        $scope.showLabel = showLabel;
        $scope.createStyle = createStyle;
        $scope.selectProject = selectProject;
        $scope.showForm = showForm;
        $scope.closeProject = closeProject;
        $rootScope.select_project = true;
        $scope.show_form = false;
        $scope.datepicked = false;
        $rootScope.project_view = false;
        var utils = UtilsService

        DigiService.get_projects(null).then(function(response) {
            if (response) {
                $scope.projects = response.data;
            }
        })

//        DigiService.get_photos(null).then(function(response) {
//            $scope.projects = response.data;
//        })

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
            $rootScope.select_project = true;
        }

        function selectProject(project, indx) {
            $rootScope.project_id = project.pk
            $rootScope.project_view = true;
            $rootScope.select_project = false;
            $scope.project = $scope.projects[indx]
            $scope.project_type = utils.PROJECT_TYPES[project.fields.project_type]
            $rootScope.todos = $scope.projects[indx].fields.todos || []
            $rootScope.photos = $scope.projects[indx].fields.photos || []
        }

        function addProject() {
            $scope.show_form = true;
            $scope.projects.push($scope.project);
        };

        function showLabel() {
            angular.element('.date-label').addClass('remove-label')
        }

        function createStyle(project) {
            if (project) {
                return {
                    "background":
                        "url(" + "'" + "/media/" + project.fields.poster + "'" + ")  no-repeat",
                    "background-size":
                        'contain'
                }
            }

            if ($scope.project) {
                console.log($scope.project)
                return {
                    "background":
                        "url(" + "'" + "/media/" + $scope.project.fields.poster + "'" + ") center no-repeat",
                    "background-size":
                        'cover'
                }
            }

        }


    }
})();