const mongoose = require('mongoose');
const producto = require('./productoSchema');

const carritoSchema = new mongoose.Schema({
  timestamp: String,
  productos: [producto]
})

module.exports = carritoSchema;