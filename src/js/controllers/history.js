'use strict';

angular.module('bwsClientApp').controller('historyController', 
  function($scope, walletService) {
    $scope.pageTitle = 'History';

    $scope.getHistory = function() {
      walletService.getHistory(function(err, h) {
        $scope.history = h;
      });
    };

});
