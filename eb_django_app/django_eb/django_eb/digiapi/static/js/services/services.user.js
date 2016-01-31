/* jshint devel:true */
(function() {
    'use strict';

    angular
        .module('digiBoardApp')
        .factory('UserService', UserService);

    UserService.$inject = [];

    function UserService() {

    var user = {
        email: "",
        password: ""
    };

    return user;
  }

})();
