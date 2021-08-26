const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: 8080,
  MONGO_URI: process.env.MONGO_URI || '',
  PERSISTENCIA: process.env.PERSISTENCIA,
}