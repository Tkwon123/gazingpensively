(function(){
    'use strict';

    angular
        .module('gazingpensive')
        .service('dataService', dataService);

    /** @ngInject */
    function dataService($firebaseArray){

        return {
            getQuotes: getQuotes
        }

        function getQuotes(category){
            var quotesRef = firebase.database().ref().child('quotes').child(category);
            return $firebaseArray(quotesRef).$loaded();
        }
    }

}());