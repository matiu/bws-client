'use strict';

angular.module('bwsClientApp').controller('createController', 
  function($scope, $state, lodash, walletService) {
    $scope.pageTitle = 'Create a new wallet';

    var COPAYER_PAIR_LIMITS = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 4,
      6: 4,
      7: 3,
      8: 3,
      9: 2,
      10: 2,
      11: 1,
      12: 1,
    };

    var getMaxRequiredCopayers = function(totalCopayers) {
      return COPAYER_PAIR_LIMITS[totalCopayers];
    };

    // ng-repeat defined number of times instead of repeating over array?
    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.totalCopayers = 3;
    $scope.TCValues = lodash.range(1, 6 + 1);

    var updateRCSelect = function(n) {
      var maxReq = getMaxRequiredCopayers(n);
      $scope.RCValues = lodash.range(1, maxReq + 1);
      $scope.requiredCopayers = Math.min(parseInt(n / 2 + 1), maxReq);
    };

    updateRCSelect($scope.totalCopayers);

    $scope.$watch('totalCopayers', function(tc) {
      updateRCSelect(tc);
    });

    $scope.create = function(wallet) {
      if (!wallet || !wallet.name) {
        return;
      }

      wallet.m = $scope.requiredCopayers;
      wallet.n = $scope.totalCopayers;

      walletService.create(wallet, function(err, data) {
        if (err) {
          return;
        }
        if (data) {
          $scope.secret = data;
        }
        else {
          $state.transitionTo('home');
        }
      }); 
    };

});
