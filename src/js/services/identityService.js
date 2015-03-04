'use strict';

angular.module('bwsClientApp').factory('identityService', 
  function($rootScope, $state, localStorageService, walletService) {
    var root = {};

    var checkIfExist = function(user) {
      return localStorageService.get(user.name);
    };

    root.isAuthenticated = function() {
      return $rootScope.iden;
    };

    root.open = function(user, cb) {
      var localUser = checkIfExist(user);
      if (localUser && user.password === localUser.password ) {
        $rootScope.iden = localUser;
        walletService.list();
        $state.go('home');
      }
      else {
        return cb(true);
      }
    };
    
    root.create = function(user, cb) {
      var newUser = {
        name: user.name,
        password: user.password,
        wallets: {}
      };
      
      if (checkIfExist(newUser)) {
        return cb(true);
      }

      if (localStorageService.set(user.name, newUser)) {
        $rootScope.iden = newUser;
        $state.go('home');
      }
      else {
        return cb(true);
      }
    };

    root.delete = function(cb) {
      if ($rootScope.iden) {
        var name = $rootScope.iden.name;
        if (localStorageService.remove(name)) {
          root.signout();
        }
        else {
          return cb(true);
        }
      }
    };

    root.signout = function() {
      if ($rootScope.iden) {
        $rootScope.iden = null;
        $rootScope.wallets = null;
        $rootScope.currentWallet = null;
        $rootScope.offline = null;
        $state.go('signin');
      }
    };

    return root;
  });
