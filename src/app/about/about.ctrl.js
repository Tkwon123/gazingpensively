(function () {
  'use strict';

  angular
    .module('gazingpensive')
    .controller('AboutController', AboutController);

  /** @ngInject */
  function AboutController(quotesData, utilityService) {
    var vm = this;

    vm.quoteData = utilityService.shuffleArray(quotesData);
    vm.counter = 1;

  }
})();
