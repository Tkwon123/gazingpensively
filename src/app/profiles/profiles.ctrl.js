(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController($state, authService, $q, $log, toastr, usersData, utilityService, quotesData) {

    var vm = this;
    vm.requote = requote;
    vm.quotesData = utilityService.shuffleArray(quotesData);
    
    vm.users = usersData;

    function requote(){
      vm.quotesData = utilityService.shuffleArray(quotesData);
    }

  }
})();
