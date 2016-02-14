/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .factory('UtilsService', UtilsService);

    UtilsService.$inject = [];

    function UtilsService() {

    var utils = {

            PROJECT_TYPES: {
                'I': 'Invitation',
                'L': 'Logo',
                'D': 'Dayof',
                'S': 'Syleshoot',
                'A': 'Addressing'
            },
            PRIORITY_TYPES: {
                'L': 'Low',
                'M': 'Med',
                'H': 'High',
            },
            STATUS_TYPES: {
                'P': 'In Progress',
                'C': 'Complete',
                'R': 'In Review',
            }
        }

    return utils;
  }

})();
