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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically set the current timestamp
      onUpdate: DataTypes.NOW, // Automatically update the timestamp on each update
    },
  },
  {
    tableName: "contact",
    timestamps: false, // Ensure Sequelize does not automatically create its own createdAt/updatedAt fields
  },
);

module.exports = Contact;
