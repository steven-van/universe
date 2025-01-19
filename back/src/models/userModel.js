const { DataTypes } = require("sequelize");
const con = require("../../config/connection");
const Friend = require("./friendModel");

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
    tableName: "user", // Nom de la table dans la base de données
  }
);

// Define associations
User.hasMany(Friend, { as: 'friendOf', foreignKey: 'friendID' });
Friend.belongsTo(User, { as: 'friendUser', foreignKey: 'friendID' });

module.exports = User;
