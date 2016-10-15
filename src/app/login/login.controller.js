(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, authService, $q) {

    var vm = this;

    vm.newUser = true;
    vm.signIn = signIn;
    vm.createUser = createUser;
    vm.goSign = goSign;
    vm.backLogin = backLogin;
    vm.uploadImage = uploadImage;

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
        }).then(function () {
          uploadImage(vm.userImage);
        });
      }
    }

    function goSign() {
      $state.go('sign');
    }

    function backLogin() {
      $state.go('login');
    }

    function uploadImage(image) {
      authService.uploadImage(image);
      angular.element('#image-file').val(null);
    }

  }
})();