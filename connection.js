'use strict';

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.Promise = global.Promise;

module.exports = (uri, sslCA) => {
  const options = {
    minPoolSize: 10,
    maxPoolSize: 200,
  };

  // DB uses sslCA Certificate
  if (sslCA) {
    options.sslCA = fs.readFileSync(path.join(__dirname, `./${sslCA}`));
  }

  const connection = mongoose.createConnection(uri, options);

  // Connection throws an error
  connection.on('error', (err) => {
    console.error(err);
  });

  return connection;
};
