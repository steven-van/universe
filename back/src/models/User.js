const { DataTypes } = require('sequelize');
const con = require('../../config/connection');

const User = con.define('User', {
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user' // Nom de la table dans la base de données
  });
  
  module.exports = User;