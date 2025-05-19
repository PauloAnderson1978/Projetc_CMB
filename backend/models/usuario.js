const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    confirmSenha: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }

  });
  
module.exports = Usuario;

