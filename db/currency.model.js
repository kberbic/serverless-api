const { Model, DataTypes } = require('sequelize');

class Currency extends Model {}
module.exports = (sequelize)=> {
    Currency.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        crypto: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, { sequelize, tableName: 'currency' });

    return Currency;
}
