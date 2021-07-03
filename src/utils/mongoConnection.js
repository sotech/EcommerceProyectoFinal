const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('Error al conectarse a MongoAtlas')
});

db.once('open', () => {
  console.log('Conectado a EcommerceDatabase')
});

module.exports = db;