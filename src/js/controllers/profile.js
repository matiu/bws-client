'use strict';

angular.module('bwsClientApp').controller('profileController', 
  function($scope, identityService) {
    $scope.pageTitle = 'Profile';

    $scope.delete = function() {
      identityService.delete(function(err) {
        if (err) {
          return;
        }
      });
    };

});
