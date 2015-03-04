'use strict';

angular.module('bwsClientApp').controller('joinController', 
  function($scope, $state, walletService) {
    $scope.pageTitle = 'Join an existent wallet'; 

    $scope.join = function(wallet) {
      if (!wallet || !wallet.secret) {
        return;
      }

      walletService.join(wallet, function(err, data) {
        if (err) {
          return;
        }
        $state.transitionTo('home');
        walletService.list();
      }); 
    };
});
