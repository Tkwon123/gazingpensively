(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, authService, $q, $log, toastr) {

    var vm = this;

    vm.newUser = true;
    vm.signIn = signIn;
    vm.createUser = createUser;
    vm.goSign = goSign;
    vm.backLogin = backLogin;

    vm.email = '';
    vm.password = '';
    vm.userImage = '';

    function signIn(formInvalid) {
      if (!formInvalid) {
        authService.signIn(vm.email, vm.password);
      }
    }

    function createUser(formInvalid) {
      if (!formInvalid) {
        return $q(function (resolve, reject) {
          authService.createUser(vm.email, vm.password);
          resolve();
        }).then(function () {
          authService.uploadImage(vm.userImage);
          toastr.success("Successfully created account");
          $state.go('home');
        });
      }
    }

    function goSign() {
      $state.go('home');
    }

    function backLogin() {
      $state.go('home');
    }

  }
})();
