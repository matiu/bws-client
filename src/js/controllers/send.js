'use strict';

angular.module('bwsClientApp').controller('sendController', 
  function($scope, $state, walletService) {
    $scope.pageTitle = 'Send';

    $scope.send = function(tx) {
      if (!tx || !tx.toAddress || !tx.amount) {
        return;
      }
      walletService.sendTransaction(tx, function(err, tx) {
        if (err) return;
        $state.transitionTo('home');
        walletService.list();
      });
    };

});
