const { DataTypes } = require("sequelize");
const con = require("../../config/connection");
const Contact = require("./contactModel");

const User = con.define(
  "User",
  {
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user", 
  }
);

// Define associations
User.hasMany(Contact, { as: 'contactOf', foreignKey: 'contactID' });
Contact.belongsTo(User, { as: 'contactUser', foreignKey: 'contactID' });

module.exports = User;
