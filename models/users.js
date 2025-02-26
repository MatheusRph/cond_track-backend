'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // Definir associações aqui, se necessário
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            ramal: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(65),
                allowNull: false,
            },
            data_cadastro: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            role: {
                type: DataTypes.STRING(10),
                allowNull: false,
                defaultValue: 'user',
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
        }
    );

    return User;
};
