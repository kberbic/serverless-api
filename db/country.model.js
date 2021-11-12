const { Model, DataTypes } = require('sequelize');

class Country extends Model {}
module.exports = (sequelize)=> {
    Country.init({
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { sequelize, tableName: 'countries' });

    return Country;
}
