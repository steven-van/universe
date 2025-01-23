const { DataTypes } = require('sequelize');
const con = require('../../config/connection');

const Message = con.define('Conversation', {
    conversationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user1ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user2ID: {
        type: DataTypes.INTEGER,
            allowNull: false,
    },
  },
   {
    tableName: 'conversation', // Nom de la table dans la base de données
    timestamps: false, // Désactive la gestion automatique des timestamps
  });
  
  module.exports = Message;