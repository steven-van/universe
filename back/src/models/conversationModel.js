const { DataTypes } = require('sequelize');
const con = require('../../config/connection');
const User = require('./userModel');

const Message = con.define('Conversation', {
    conversation_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "user_id",
          },
    },
    user2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "user_id",
            },
    },
  },
   {
    tableName: 'conversation', // Nom de la table dans la base de données
    timestamps: false, // Désactive la gestion automatique des timestamps
  });
  
  module.exports = Message;