(function() {
  'use strict';

  angular
    .module('gazingpensive')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
