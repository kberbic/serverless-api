const { Model, DataTypes } = require('sequelize');

class UserInfo extends Model {}
module.exports = (sequelize, {Country, Currency})=>{
    UserInfo.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        terms: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, { sequelize, tableName: 'user_info' });

    UserInfo.belongsTo(Country, {as: 'Country'});
    UserInfo.belongsTo(Currency, {as: 'Currency'});

    return UserInfo;
};
