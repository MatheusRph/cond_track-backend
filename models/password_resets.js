'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserPasswordReset extends Model {
        static associate(models) { }
    }
    UserPasswordReset.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            sequelize,
            tableName: 'password_resets',
            modelName: 'UserPasswordReset',
            timestamps: true,
        }
    );
    return UserPasswordReset;
};
