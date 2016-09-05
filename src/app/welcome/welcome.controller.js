(function(){
    'use strict';

    angular
        .module('gazingpensive')
        .controller('WelcomeController', WelcomeController);

    /** @ngInject */
    function WelcomeController($state){
        var vm = this;
        vm.enter = goHome;

        function goHome(){
            $state.go('home');
        }

    }

}());