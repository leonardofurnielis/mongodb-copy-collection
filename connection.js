'use strict';

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.Promise = global.Promise;

module.exports = (uri, cert) => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10
  };

  // DB uses sslCA Certificate
  if (cert) {
    options.sslCA = fs.readFileSync(path.join(__dirname, `./cert/${cert}`));
  }

  const connection = mongoose.createConnection(uri, options);

  // Connection throws an error
  connection.on('error', err => {
    console.error(err);
  });

  return connection;
};
