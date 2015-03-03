'use strict';

angular.module('bwsClientApp').controller('sendController', 
  function($scope, walletService) {
    $scope.pageTitle = 'Send';

    $scope.send = function(tx) {
      if (!tx || !tx.toAddress || !tx.amount) {
        return;
      }
      walletService.sendTransaction(tx, function(err, tx) {
        if (err) return;
      });
    };

});
