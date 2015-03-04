# bws-client
A thin weclient that use [bitcore-wallet-client](https://github.com/bitpay/bitcore-wallet-client) library to handle wallets through [bitcore-wallet-service](https://github.com/bitpay/bitcore-wallet-service).

## Warning

This project was developed to demotrate the good use of the library [bitcore-wallet-client](https://github.com/bitpay/bitcore-wallet-client). It is not safe to use with `real` bitcoins!

All communications to [bitcore-wallet-service](https://github.com/bitpay/bitcore-wallet-service) are not encrypted. The wallets are also stored on your local browser in `plain text`.

## Requirement

Run your own [bitcore-wallet-service](https://github.com/bitpay/bitcore-wallet-service).

## Installation

Clone the repository and run the follows commands: 

```
npm install
bower install
grunt
```

Start the webserver in port `5000` by default:

```
npm start
```

Open your browser on [http://localhost:5000](http://localhost:5000)
