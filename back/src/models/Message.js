const { DataTypes } = require('sequelize');
const con = require('../../config/connection');

const Message = con.define('Message', {
    messageID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    texte_message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date_message: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status_message: {
      type: DataTypes.STRING,
      allowNull: true, // Initialement à null
    },
    expediteurID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    destinataireID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conversationID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'message', // Nom de la table dans la base de données
    timestamps: false, 
  });
  
  module.exports = Message; // Pour exporter l'entité