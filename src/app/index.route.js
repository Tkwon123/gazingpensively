(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('welcome', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'app/welcome/welcome.html',
            controller: 'WelcomeController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          'quotesData': ['dataService', function (dataService) {
            return dataService.getQuotes('beauty');
          }]
        }
      })
      .state('home', {
        url: '/home',
        views: {
          '@': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          'quotesData': ['dataService', function (dataService) {
            return dataService.getQuotes('beauty');
          }]
        }
      })
      .state('login', {
        url: '/login',
        views: {
          '@': {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      })
    $urlRouterProvider.otherwise('/');
  }

})();
