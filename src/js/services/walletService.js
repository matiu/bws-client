'use strict';

angular.module('bwsClientApp').factory('walletService', 
  function($rootScope, $http, localStorageService) {
    var root = {};

    var set = function(wId, data) {
      var wallets = {};
      $rootScope.iden.wallets[wId] = data;
      $rootScope.iden.lastOpenedWallet = wId;
      if (localStorageService.set($rootScope.iden.name, $rootScope.iden)) {
        console.log('Wallet stored');
      }
    };

    var get = function(wId) {
      if (!$rootScope.iden || !$rootScope.iden.name)
        return;
      var iden = localStorageService.get($rootScope.iden.name);
      if (!wId)
        return iden.wallets;
      else
        return iden.wallets[wId];
    };

    var updateStatus = function(wallet, cb) {
      $rootScope.offline = false;
      $http.post('/status', wallet).
      success(function(data, status, headers, config) {
        if (data.err) {
          $rootScope.currentWallet = {wallet: JSON.parse(wallet)};
          $rootScope.offline = true;
          return cb(data.err, null);
        }
        else {
          $rootScope.currentWallet = data.res;
          $rootScope.offline = false;
          return cb(null, data.res);
        }
      }). 
      error(function(data, status, headers, config) {});
    };

    root.list = function() {
      var ws = get();
      if (!ws) return;
      $rootScope.wallets = [];
      for (var wId in ws) {
        if (wId === $rootScope.iden.lastOpenedWallet) {
          $rootScope.currentWallet = {wallet: JSON.parse(ws[wId])};
          var wa = ws[wId];
          updateStatus(wa, function(err, w) {});
        }
        $rootScope.wallets.push(JSON.parse(ws[wId]));
      }
    };

    root.create = function(wallet, cb) {
      var wallet = {
        walletName : wallet.name,
        copayerName : $rootScope.iden.name,
        mn : [wallet.m, wallet.n],
        network : wallet.network
      };

      $http.post('/create', wallet).
        success(function(data, status, headers, config) {
          if (!data.err) {
            var obj = JSON.parse(data.wallet);
            set(obj.walletId, data.wallet);
          }
          return cb(data.err, data.res);
      }).
      error(function(data, status, headers, config) {});
    };

    root.join = function(wallet, cb) {
      var wallet = {
        walletSecret : wallet.secret,
        copayerName : $rootScope.iden.name
      };

      $http.post('/join', wallet).
        success(function(data, status, headers, config) {
          if (!data.err) {
            $rootScope.iden.wallets
            var obj = JSON.parse(data.wallet);
            set(obj.walletId, data.wallet);
          }
          return cb(data.err, data.res);
      }).
      error(function(data, status, headers, config) {});
    };

    root.open = function(wId, cb) {
      var ws = get(wId);
      if (!ws) return cb();
      $http.post('/open', ws).
        success(function(data, status, headers, config) {
          if (!data.err) {
            $rootScope.currentWallet = {wallet: JSON.parse(ws)};
            set(wId, data.wallet);
          }
          updateStatus(data.wallet, function(err, w) {
            if (!err && w) {
              $rootScope.currentWallet = w;
            }
            return cb(err, w);
          });
        }).
        error(function(data, status, headers, config) {});      
    }; 

    root.getAddress = function(cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/address', w).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }). 
        error(function(data, status, headers, config) {});
    };

    root.getAddresses = function(cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/addresses', w).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }). 
        error(function(data, status, headers, config) {});
    };

    root.sendTransaction = function(tx, cb) {
      var body = {
        wallet: $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id],
        tx: tx
      };
      $http.post('/send', body).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }).
        error(function(data, status, headers, config) {});
    };

    root.signTransaction = function(txp, cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/sign', {txp: txp, wallet: w}).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }).
        error(function(data, status, headers, config) {});
    };

    root.rejectTransaction = function(txp, cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/reject', {txp: txp, wallet: w}).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }).
        error(function(data, status, headers, config) {});
    };

    root.broadcastTransaction = function(txp, cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/broadcast', {txp: txp, wallet: w}).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }).
        error(function(data, status, headers, config) {});
    };

    root.getHistory = function(cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/history', w).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }). 
        error(function(data, status, headers, config) {});
    };

    root.getBalance = function(cb) {
      var w = $rootScope.iden.wallets[$rootScope.currentWallet.wallet.id];
      $http.post('/balance', w).
        success(function(data, status, headers, config) {
          return cb(data.err, data.res);
        }). 
        error(function(data, status, headers, config) {});
    };

    return root;
  });
