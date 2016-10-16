(function () {
    'use strict';

    angular
        .module('gazingpensive')
        .controller('WelcomeController', WelcomeController);

    /** @ngInject */
    function WelcomeController($state) {
        var vm = this;
        vm.enter = enter;

        function enter() {
            $state.go('profiles');
        }

    }

} ());