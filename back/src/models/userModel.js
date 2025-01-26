const { DataTypes } = require("sequelize");
const con = require("../../config/connection");
const Contact = require("./contactModel");

const User = con.define(
  "User",
  {
    user_id: {  
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
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
    created_at: {  
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,  // Automatically set the current timestamp
    },
    updated_at: {  
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,  // Automatically set the current timestamp
      onUpdate: DataTypes.NOW,  // Automatically update the timestamp on each update
    }
  },
  {
    tableName: "user",  
    timestamps: false,  // Ensure Sequelize doesn't automatically add its own createdAt/updatedAt fields
  }
);

// Define associations
User.hasMany(Contact, { as: 'contact_of', foreignKey: 'contact_id' });  
Contact.belongsTo(User, { as: 'contact_user', foreignKey: 'contact_id' });  

module.exports = User;
