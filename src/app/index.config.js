(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $mdThemingProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.html5Mode(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('green');

    var config = {
      apiKey: "AIzaSyDj1XgW4gD1XfM_JNkGiM7u8MNVnNUv4I8",
      authDomain: "gazingpensive.firebaseapp.com",
      databaseURL: "https://gazingpensive.firebaseio.com",
      storageBucket: "gazingpensive.appspot.com",
      messagingSenderId: "126461700644"
    };

    firebase.initializeApp(config);

  }

})();
