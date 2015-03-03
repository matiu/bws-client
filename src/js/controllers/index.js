'use strict';

angular.module('bwsClientApp').controller('indexController', 
  function($scope, $http, $timeout, localStorageService) {

  $scope.init = function() {
    $scope.pageTitle = 'Copay';
    $scope.pageSubTitle = 'Bitcore wallet service client';
    $scope.currentWallet = null;
    $scope.wallets = {};
    if(localStorageService.isSupported) {
      console.log('LocalStorage supported!');
      $scope.currentWallet = localStorageService.get('lastOpenedWallet');
    }
  };

  var getWallets = function() {
    $http.get('/list').
      success(function(data, status, headers, config) {
        data.content.forEach(function(w, i) {
console.log('[index.js:36]',w); //TODO
          $scope.openWallet(w);
        });
      }). 
      error(function(data, status, headers, config) {});
  };

  $scope.openWallet = function(walletName) {
    var w = { walletName : walletName };
    $http.post('/open', w).
      success(function(data, status, headers, config) {
console.log('[index.js:35] BIEN',data); //TODO
        $scope.statusWallet();
      }).
      error(function(data, status, headers, config) {
console.log('[index.js:38] ERROR',data); //TODO
      });
  };

  $scope.createWallet = function() {
    var wallet = {
      walletName : 'Queparece',
      copayerName : 'gusss',
      mn : [1, 1],
      network : 'testnet'
    };

    $http.post('/create', wallet).
      success(function(data, status, headers, config) {
console.log('[index.js:35] BIEN',data); //TODO
      }).
      error(function(data, status, headers, config) {
console.log('[index.js:38] ERROR',data); //TODO
      });
  };

  $scope.sendTransaction = function() {
    $scope.loadingWallet = true; 
    var tx = {
      toAddress : 'moWFtyFPg8y13xuoznjjxWvGw3XXQW7Kq2',
      amount : 10000,
      message : 'que parece'
    };
    $http.post('/send', tx).
      success(function(data, status, headers, config) {
console.log('[index.js:35] BIEN',data); //TODO
        $scope.statusWallet();
      }).
      error(function(data, status, headers, config) {
console.log('[index.js:38] ERROR',data); //TODO
      });
  };

  $scope.signTransaction = function(txp) {
    $scope.loadingWallet = true; 
    $http.post('/sign', txp).
      success(function(data, status, headers, config) {
console.log('[index.js:35] BIEN',data); //TODO
        $scope.statusWallet();
      }).
      error(function(data, status, headers, config) {
console.log('[index.js:38] ERROR',data); //TODO
      });
  };

  $scope.rejectTransaction = function(txp) {
    $scope.loadingWallet = true; 
    $http.post('/reject', txp).
      success(function(data, status, headers, config) {
console.log('[index.js:35] BIEN',data); //TODO
        $scope.statusWallet();
      }).
      error(function(data, status, headers, config) {
console.log('[index.js:38] ERROR',data); //TODO
      });
  };

  $scope.broadcastTransaction = function(txp) {
    $scope.loadingWallet = true; 
    $http.post('/broadcast', txp).
      success(function(data, status, headers, config) {
console.log('[index.js:35] BIEN',data); //TODO
        $scope.statusWallet();
      }).
      error(function(data, status, headers, config) {
console.log('[index.js:38] ERROR',data); //TODO
      });
  };

  $scope.statusWallet = function() {
    $scope.loadingWallet = true; 
    $http.get('/status').
      success(function(data, status, headers, config) {
console.log('[index.js:45]',data); //TODO
        var walletId = data.content.wallet.id;
        $scope.currentWallet = localStorageService.set('lastOpenedWallet', walletId);
        $scope.wallets = { walletId : data.content };
        $scope.loadingWallet = false; 
      }). 
      error(function(data, status, headers, config) {});
  };

  $scope.getAddress = function() {
    $scope.loadingAddress = true;
    $http.get('/address').
      success(function(data, status, headers, config) {
console.log('[index.js:45]',data); //TODO
        $scope.address = data.content.address;
        $scope.loadingAddress = false;
      }). 
      error(function(data, status, headers, config) {});
  };

  $scope.getBalance = function() {
    $http.get('/balance').
      success(function(data, status, headers, config) {
console.log('[index.js:45]',data); //TODO
      }). 
      error(function(data, status, headers, config) {});
  };

  $scope.getHistory = function() {
    $http.get('/history').
      success(function(data, status, headers, config) {
console.log('[index.js:45]',data); //TODO
        $scope.history = data.content;
      }). 
      error(function(data, status, headers, config) {});
  };

});
