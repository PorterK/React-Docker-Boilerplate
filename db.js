const Sequelize = require('sequelize');

const dbUrl = process.env.APP_DB_USER ? `postgres://${process.env.APP_DB_USER}@${
process.env.APP_DB_HOST}:${process.env.APP_DB_PORT}/${process.env.APP_DB_NAME}` : process.env.DATABASE_URL;

const db = new Sequelize(dbUrl, {
  dialect: 'postgres',
  underscored: true,
  logging: false, // console.log,
});

module.exports = db;
