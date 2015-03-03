'use strict';

angular.module('bwsClientApp').controller('homeController', 
  function($scope, $rootScope, walletService) {
    $scope.pageTitle = 'Home';

    $scope.updateList = function() {
      walletService.list();
    };

});
