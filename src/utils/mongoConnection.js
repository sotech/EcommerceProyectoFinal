const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const info = require('log4js').getLogger();
const errors = require('log4js').getLogger('errors');

db.on('error', () => {
  errors.error('Error al conectarse a MongoAtlas')
});

db.once('open', () => {
  info.info('Conectado a EcommerceDatabase')
});

module.exports = db;