require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize({
  dialect: 'mssql', // o el dialecto correspondiente (por ejemplo, 'mysql' o 'postgres')
  host: DB_HOST,
  port: DB_PORT, // asegúrate de definir esta variable en tu archivo de configuración
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true, // si tu servidor SQL Server requiere conexión cifrada
    },
  },
});

module.exports = {
  conn: sequelize,
};