'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Aviso extends Model {
    static associate(models) {
      // Defina associações aqui, se necessário
      this.belongsTo(models.User, { foreignKey: 'ramal_id' }); // Exemplo de associação
    }
  }

  Aviso.init(
    {
      id: {
        type: DataTypes.INTEGER, // INT
        allowNull: false, // NOT NULL
        primaryKey: true, // Chave primária
        autoIncrement: true, // Auto incremento
      },
      ramal_id: {
        type: DataTypes.STRING(120), // VARCHAR(120)
        allowNull: false, // NOT NULL
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(500), // NVARCHAR(65)
        allowNull: false, // NOT NULL
      },
      date_created: {
        type: DataTypes.DATE, // TIMESTAMP
        allowNull: false,
        defaultValue: DataTypes.NOW, // DEFAULT CURRENT_TIMESTAMP
        get() {
          const value = this.getDataValue('date_created');
          return value ? value.toISOString().split('T')[0] : null; // Retorna apenas a data no formato YYYY-MM-DD
        },
      },
    },
    {
      sequelize,
      modelName: 'Aviso', // Nome do modelo
      tableName: 'avisos', // Nome da tabela no banco
      timestamps: false, // Remove campos createdAt e updatedAt
    }
  );

  return Aviso;
};