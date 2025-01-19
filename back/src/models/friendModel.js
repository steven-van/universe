const { DataTypes } = require("sequelize");
const con = require("../../config/connection");
const User = require("./userModel");

const Friend = con.define(
  "Friend",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userID",
      },
    },
    friendID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userID",
      },
    },
  },
  {
    tableName: "friend",
  }
);

module.exports = Friend;