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
        }
      })
      .state('profiles', {
        url: '/main',
        views: {
          '@': {
            templateUrl: 'app/profiles/profiles.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          'usersData': ['dataService', function (dataService) {
            return dataService.getUsers();
          }],
          'quotesData': ['dataService', function (dataService) {
            return dataService.getQuotes('art');
          }]
        }
      })
      .state('about', {
        url: '/about',
        views: {
          '@': {
            templateUrl: 'app/about/about.html',
            controller: 'AboutController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          'quotesData': ['dataService', function (dataService) {
            return dataService.getQuotes('beauty');
          }]
          // 'authSession': ['authService', function (authService) {
          //   return authService.checkAuthSession();
          // }]
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
