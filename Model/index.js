const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql", 
    pool: {
        min: 0,
        max: 5,
        acquire: 5000,
        Idle: 1000
      }
});

sequelize
    .authenticate()
    .then(() => {
        console.log("DB Connected")
    })
    .catch((err) => {
        console.log("Cannot connect DB" + err)
    })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.responses = require('./response') (sequelize, Sequelize);
module.exports = db;
