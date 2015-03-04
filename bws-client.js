var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var recursive = require('recursive-readdir');
var Client = require('./node_modules/bitcore-wallet-client/lib/index.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var port = process.env.BWSCLIENT_PORT || 5000;
app.listen(port);
console.log("App listening on port " + port);

var c, storage;

var initWallet = function(walletData) {
  var client = new Client({
    baseUrl: process.env['BWS_HOST'] || 'http://localhost:3001/copay/api',
    verbose: null,
  });
  if (!walletData) {
    return client;
  }
  if (typeof(walletData) != 'string') {
    walletData = JSON.stringify(walletData);
  }

  client.import(walletData);
  return client;
};

app.post('/status', function(req, res) {
  var walletData = req.body;
  var c = initWallet(walletData);
  c.getStatus(function(err, x) {
    res.send({err: err, res: x, wallet: c.export()});
  });
  
});

app.post('/open', function(req, res) {
  var wallet = req.body;
  var c = initWallet(wallet);
  c.openWallet(function(err, x) {
    res.send({err: err, res: x, wallet: c.export()});
  });
});

app.post('/create', function(req, res) {
  var walletName = req.body.walletName;
  var copayerName = req.body.copayerName;
  var mn = req.body.mn;
  var network = req.body.network;

  c = initWallet();

  c.createWallet(walletName, copayerName, mn[0], mn[1], network, function(err, secret) {
    res.send({err: err, res: secret, wallet: c.export()});
  });
});

app.post('/join', function(req, res) {
  var walletSecret = req.body.walletSecret;
  var copayerName = req.body.copayerName;

  c = initWallet();

  c.joinWallet(walletSecret, copayerName, function(err, wallet) {
    res.send({err: err, res: wallet, wallet: c.export()});
  });
});

app.post('/send', function(req, res) {
  var tx = req.body.tx;
  var walletData = req.body.wallet;
  var c = initWallet(walletData);

  c.sendTxProposal(tx, function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/sign', function(req, res) {
  var txp = req.body.txp;
  var walletData = req.body.wallet;
  var c = initWallet(walletData);

  c.signTxProposal(txp, function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/reject', function(req, res) {
  var txp = req.body.txp;
  var walletData = req.body.wallet;
  var c = initWallet(walletData);

  c.rejectTxProposal(txp, 'no reason', function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/broadcast', function(req, res) {
  var txp = req.body.txp;
  var walletData = req.body.wallet;
  var c = initWallet(walletData);

  c.broadcastTxProposal(txp, function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/address', function(req, res) {
  var wallet = req.body;
  var c = initWallet(wallet);

  c.createAddress(function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/addresses', function(req, res) {
  var wallet = req.body;
  var c = initWallet(wallet);

  c.getMainAddresses({
    doNotVerify: true
  }, function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/balance', function(req, res) {
  var walletData = req.body;
  var c = initWallet(walletData);

  c.getBalance(function(err, x) {
    res.send({err: err, res: x});
  });
});

app.post('/history', function(req, res) {
  var walletData = req.body;
  var c = initWallet(walletData);

  c.getTxHistory({}, function(err, x) {
    res.send({err: err, res: x});
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public'));
});

