'use strict';

angular.module('bwsClientApp').controller('topbarController', 
  function($scope, $state, walletService) {

    $scope.open = function(w) {
      if (!w) return;
      $state.transitionTo('home');
      walletService.open(w, function(err, wallet) {
        if (err) {
          return;
        }
      });
    };

});
