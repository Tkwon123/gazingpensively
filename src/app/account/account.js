(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController(profile, authService, notifyService, authData) {
    var vm = this;
    vm.profile = profile;
    vm.passwordChange = passwordChange;
    vm.uploadImage = uploadImage;

    function passwordChange(formInvalid) {
      if (formInvalid) {
        if (vm.password.older && vm.password.confirm) {
          notifyService.displayToast("Passwords Pattern Invalid!");
        } else {
          notifyService.displayToast("Please Complete all fields");
        }
      } else {
        if (vm.password.new !== vm.password.confirm) {
          notifyService.displayToast("Passwords do not match!");
        } else {
          authService.passwordChange(vm.profile.email, vm.password);
          vm.password = '';
        }
      }
    }

    function uploadImage() {
      authService.uploadImage(authData.uid, vm.userImage);
      angular.element('#image-file').val(null);
    }
  }
})();
