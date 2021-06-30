const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  _id:Number,
  timestamp:String,
  nombre:String,
  descripcion:String,
  codigo:String,
  foto:String,
  precio:Number,
  stock:Number
})

module.exports = productoSchema;