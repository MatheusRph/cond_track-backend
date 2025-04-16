'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Entrega extends Model {
        static associate(models) {
            }
    }

    Entrega.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ramal_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                }
            },
            item: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            responsavel: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            data_entrega: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            data_concluido: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
            }
        },
        {
            sequelize,
            modelName: 'Entrega', 
            tableName: 'entrega', 
            timestamps: false 
        }
    );

    return Entrega;
};