'use strict';

angular.module('bwsClientApp').controller('signinController', 
  function($scope, identityService) {
    $scope.pageTitle = 'Signin';

    $scope.signin = function(user) {
      if (!user) {
        return;
      }

      identityService.open(user, function(err) {
        if (err) {
          return;
        }
      }); 
    };

});
