(function () {
  'use strict';
  angular.module('gazingpensive')

    .factory('refService', refService);

  /** @ngInject **/
  function refService(firebase) {

    var ref = firebase.database().ref();
    var usersRef = ref.child('users');

    var refPath = {
      ref: ref,
      usersRef: usersRef
    };

    return refPath;
  }

})();
