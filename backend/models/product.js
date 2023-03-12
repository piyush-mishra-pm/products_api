const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
});

module.exports = mongoose.model('product', productSchema);
