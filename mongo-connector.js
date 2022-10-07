'use strict';

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.Promise = global.Promise;

module.exports = (uri, sslCAFilename) => {
  const options = {
    minPoolSize: 10,
    maxPoolSize: 500,
  };

  // DB uses sslCA Certificate
  if (sslCAFilename) {
    options.sslCA = fs.readFileSync(path.join(__dirname, `./${sslCAFilename}`));
  }

  let service;

  if (uri) {
    service = mongoose.createConnection(uri, options);
    
    // Connection throws an error
    service.on('error', (err) => console.error(err));
  }

  return service;
};
