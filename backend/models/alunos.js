const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Alunos = sequelize.define("matriculas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  instituicao: {
    type: DataTypes.ENUM(
      "EB",
      "FAB",
      "MB",
      "BB",
      "PM",
      "Estrangeiro",
      "Concedido"
    ),
    allowNull: false,
    defaultValue: "EB",
  },
  nacionalidade: {
    type: DataTypes.ENUM("brasileiro", "estrangeiro"),
    allowNull: false,
    defaultValue: "brasileiro",
  },
  protocolo_numero: {
    type: DataTypes.STRING(15),
    allowNull: true,
    unique: true,
  },
  foto_aluno: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  aluno_numero: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  turma: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  ano_letivo: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  nome_aluno: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true,
  },
  email_aluno: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  nome_pai: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email_pai: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  telefone_pai: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      is: /^(\+?55)?\s?(?:\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
    },
  },
  posto_pai: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  nome_mae: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  email_mae: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  telefone_mae: {
    type: DataTypes.STRING(15),
    allowNull: true,
    validate: {
      is: /^(\+?55)?\s?(?:\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
    }
  },
  posto_mae: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  responsavel_nome: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  responsavel_email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  responsavel_endereco: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  responsavel_telefone: {
    type: DataTypes.STRING(15),
    allowNull: true,
    validate: {
      is: /^(\+?55)?\s?(?:\(?\d{2}\)?[\s-]?)?\d{4,5}[\s-]?\d{4}$/,
    }
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  doc_bloco_1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  doc_bloco_2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  doc_bloco_3: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  data_cadastro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "matriculas",
  timestamps: false,
});

module.exports = Alunos;