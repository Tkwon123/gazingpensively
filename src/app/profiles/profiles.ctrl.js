(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController($state, authService, $q, $log, toastr, usersData) {

    var vm = this;
    vm.users = usersData;




  }
})();
