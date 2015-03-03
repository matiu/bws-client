'use strict';

angular.module('bwsClientApp').controller('joinController', 
  function($scope, walletService) {
    $scope.pageTitle = 'Join an existent wallet';

    $scope.join = function(wallet) {
console.log('[join.js:7]',wallet); //TODO
      if (!wallet || !wallet.secret) {
        return;
      }

      walletService.join(wallet, function(err, data) {
console.log('[join.js:13]',err, data); //TODO
        if (err) {
          return;
        }
      }); 
    };
});
