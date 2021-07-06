const mongoose = require('mongoose');
const Carrito = require('./carritoSchema');

const userSchema = new mongoose.Schema({
  email:String,
  password:String,
  nombre:String,
  direccion:String,
  edad:Number,
  telefono:String,
  fotoURL:String,
  carrito:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Carrito'
  }
})

module.exports = userSchema;