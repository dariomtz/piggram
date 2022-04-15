const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || '';
const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_CLUSTER = process.env.DB_CLUSTER || '';

const dbURI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}`;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log(`Moongose connection open to ${dbURI}`);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection diconnected through app termination');
    process.exit(0);
  });
});