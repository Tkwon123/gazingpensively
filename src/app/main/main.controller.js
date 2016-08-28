(function() {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(quotesData, utilityService) {
    var vm = this;
    
    vm.quoteData = utilityService.shuffleArray(quotesData);

    vm.counter = 1;

  }
})();
