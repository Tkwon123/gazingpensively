(function () {
    'use strict';

    angular
        .module('gazingpensive')
        .service('dataService', dataService);

    /** @ngInject */
    function dataService($firebaseArray, refService) {

        return {
            getQuotes: getQuotes,
            getUsers: getUsers
        }

        function getQuotes(category) {
            var quotesRef = firebase.database().ref().child('quotes').child(category);
            return $firebaseArray(quotesRef).$loaded();
        }

        function getUsers() {
            var usersRef = refService.usersRef;
            return $firebaseArray(usersRef).$loaded();
        }

    }

} ());