(function() {
    'use strict';
    angular
        .module('gazingpensive')
        .directive('fileUploader', function($parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var model = $parse(attrs.fileUploader);
                    var modelSetter = model.assign;

                    element.bind('change', function() {
                        scope.$apply(function() {
                            modelSetter(scope, element[0].files[0]);
                            element.focus();
                        });
                    });
                }
            };
        });
})();
