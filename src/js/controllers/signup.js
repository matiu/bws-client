'use strict';

angular.module('bwsClientApp').controller('signupController', 
  function($scope, identityService) {
    $scope.pageTitle = 'Signup';

    $scope.signup = function(user) {
      if (!user || !user.name || !user.password) {
        return;
      }

      if (user.password != user.repeatpassword) {
        return;
      }

      identityService.create(user, function(err) {
        if (err) {
          return;
        }
      }); 
    };

});
