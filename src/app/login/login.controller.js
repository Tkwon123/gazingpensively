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

    vm.user = {};

    function signIn(formInvalid) {
      if (!formInvalid) {
        authService.signIn(vm.user.email, vm.user.password);
      }
    }

    function createUser(formInvalid) {
      if (!formInvalid) {
        authService.createUser(vm.user)
          .then((function (firebaseId) {
            $log.log("FIREBASEID: ", firebaseId);
            $log.log("VM.USER: ", vm.user);
            authService.uploadImage(vm.userImage, firebaseId);
            toastr.success("Successfully created account");
            $state.go('profiles');
          }));
      }
    }

    function goSign() {
      $state.go('profiles');
    }

    function backLogin() {
      $state.go('profiles');
    }

  }
})();