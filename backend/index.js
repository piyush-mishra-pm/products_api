const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const SECRET_KEYS = require('./config/keys');

const productRoutes = require('./routes/product-routes');
const ErrorObject = require('./utils/ErrorObject');

const app = express();

app.use(bodyParser.json());

// CORS relevant:
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});

app.use('/products', productRoutes);

// Default Error Handler:
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.send({success: 'false', message: error.message || 'Something wrong happened!', data: error.data});
});

// Path Not found:
app.use((req, res, next) => {
  res.status(404);
  res.send('Path not found!');
});

mongoose
  .connect(SECRET_KEYS.MONGODB_ADDRESS)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(SECRET_KEYS.PORT || 8001, () => {
      console.log('listening on port', SECRET_KEYS.PORT);
    });
  })
  .catch((err) => {
    console.log('Error while connecting to DB: ', err);
  });
