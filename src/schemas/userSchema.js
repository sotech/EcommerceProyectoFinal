const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:String,
  password:String,
  nombre:String,
  direccion:String,
  edad:Number,
  telefono:String,
  fotoURL:String,
  esAdmin:Boolean,
})

module.exports = userSchema;