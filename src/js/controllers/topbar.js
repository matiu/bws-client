'use strict';

angular.module('bwsClientApp').controller('topbarController', 
  function($scope, walletService) {

    $scope.open = function(w) {
      if (!w) return;
      walletService.open(w, function(err, wallet) {
        if (err) {
          return;
        }
      });
    };

});
