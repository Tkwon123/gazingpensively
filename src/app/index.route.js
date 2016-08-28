(function() {
  'use strict';

  angular
    .module('gazingpensive')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {
          'quotesData' : ['dataService', function(dataService){
            return dataService.getQuotes('beauty');
          }]
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
