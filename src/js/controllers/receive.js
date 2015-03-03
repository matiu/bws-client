'use strict';

angular.module('bwsClientApp').controller('receiveController', 
  function($scope, walletService) {
    $scope.pageTitle = 'Receive';

    $scope.getAddress = function() {
      walletService.getAddress(function(err, addr) {
        if (err) return;
        $scope.address = addr.address;
      });
    }

    $scope.getAddresses = function() {
      walletService.getAddresses(function(err, addrs) {
        if (err) return;
        $scope.addresses = addrs;
      });
    }

});
