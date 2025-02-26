const dotenv = require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_DIALECT, DB_LOGGING} = process.env

module.exports = {
  development: {
    username: DB_USER || 'root',
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: DB_LOGGING === 'true',
  },
};