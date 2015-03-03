'use strict';

angular.module('bwsClientApp').controller('signoutController', 
  function($scope, identityService) {
    identityService.signout();
});
