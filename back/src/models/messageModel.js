const { DataTypes } = require("sequelize");
const con = require("../../config/connection");
const Conversation = require("./conversationModel");

const Message = con.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text_message: {
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
      allowNull: true, // initally null until the message is read by bodyguard
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Conversation,
        key: "conversation_id",
      },
    },
  },
  {
    tableName: "message", // Message table name
    timestamps: false,
  },
);

module.exports = Message;
