const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email:String,
  password:String,
  nombre:String,
  telefono:String,
})

module.exports = userSchema;