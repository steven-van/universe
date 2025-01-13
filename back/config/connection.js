const { Sequelize } = require('sequelize');

const con = new Sequelize('universebdd', 'root', "", {
    host: 'localhost',
    dialect: 'mysql'
  }); 

module.exports= con