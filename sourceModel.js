'use strict';

const mongoose = require(`mongoose`);
const connection = require('./connection')('mongodb://localhost:27017/', null);

module.exports = collection => {
  return connection.model(
    collection,
    new mongoose.Schema({}, { strict: false }),
    collection
  );
};
