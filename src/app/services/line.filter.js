(function(){
    'use strict';

    angular
        .module('gazingpensive')
        .filter('lineBreak', lineBreak);

    function lineBreak(){

        return FilterFn;

        function FilterFn(params){
            
            return params.replace(/ \\/g, ', ');
        }
    }

}());