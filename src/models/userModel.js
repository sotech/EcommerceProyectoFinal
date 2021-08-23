const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email:String,
  password:String,
  telefono:String,
  nombre:String,
  carrito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrito'
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;