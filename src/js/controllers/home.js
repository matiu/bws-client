'use strict';

angular.module('bwsClientApp').controller('homeController', 
  function($scope, $rootScope, walletService) {
    $scope.pageTitle = 'Home';

    $scope.updateList = function() {
      walletService.list();
    };

    $scope.checkSignatures = function(actions) {
      var count = 0;
      for (var i = 0; i < actions.length; i++ ) {
        if (actions[i].type == 'accept') {
          count++;
        }
      }
      return count;
    };

    $scope.checkMyAction = function(actions) {
      for (var i = 0; i < actions.length; i++ ) {
        if (actions[i].copayerName == $rootScope.currentWallet.wallet.name) {
          return true;
        }
      }
      return false;
    };

    $scope.sign = function(txp) {
      walletService.signTransaction(txp, function(err, txid) {
        walletService.list();
      });
    };

    $scope.reject = function(txp) {
      walletService.rejecttransaction(txp, function(err, txid) {
        walletService.list();
      });
    };

    $scope.broadcast = function(txp) {
      walletService.broadcastTransaction(txp, function(err, txid) {
        walletService.list();
      });
    };

});
