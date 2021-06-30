const mongoose = require('mongoose');
const productoSchema = require('../schemas/productoSchema');

const Producto = mongoose.model('Producto',productoSchema);

module.exports = Producto;