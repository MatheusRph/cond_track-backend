'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Suggestion extends Model {
    static associate(models) {
      // Defina associações aqui, se necessário
      this.belongsTo(models.User, { foreignKey: 'ramal_id' });
    }
  }

  Suggestion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Define como chave primária
        autoIncrement: true, // Auto incremento
        allowNull: false
      },
      ramal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ramals', // Nome da tabela referenciada
          key: 'id', // Chave primária da tabela `ramals`
        },
      },
      message: {
        type: DataTypes.STRING, // Correção: removidos os parênteses
        allowNull: false
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'Suggestion', // Nome do modelo
      tableName: 'suggestions', // Nome da tabela no banco
      timestamps: false // Não adiciona `createdAt` e `updatedAt`
    }
  );

  return Suggestion;
};
