const { DataTypes } = require("sequelize");
const con = require("../../config/connection");
const User = require("./userModel");

const Contact = con.define(
  "Contact",
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
    contactID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userID",
      },
    },
  },
  {
    tableName: "contact",
  }
);

module.exports = Contact;