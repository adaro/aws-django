angular.module('digiBoardApp').directive('fileModel', ['$parse', 'DigiService', '$rootScope' , function ($parse, DigiService, $rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                DigiService.post_photos(element[0].files[0], $rootScope.project_id)
                $rootScope.photos = DigiService.get_photos( $rootScope.project_id )

            });
        }
    };
}]);

