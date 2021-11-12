const { Model, DataTypes } = require('sequelize');

class Currency extends Model {}
module.exports = (sequelize)=> {
    /*
      "id": "BTC",
      "fullName": "Bitcoin",
      "crypto": true,
      "payinEnabled": true,
      "payinPaymentId": false,
      "payinConfirmations": 2,
      "payoutEnabled": true,
      "payoutIsPaymentId": false,
      "transferEnabled": true,
      "delisted": false,
      "payoutFee": "0.00958",
      "payoutMinimalAmount": "0.00958",
      "precisionPayout": 10,
      "precisionTransfer": 10
* */
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
        payinEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        payoutEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        payoutFee: {
            type: DataTypes.DECIMAL,
        },
        minPayoutAmount: {
            type: DataTypes.INTEGER,
        },
        maxPayoutAmount: {
            type: DataTypes.INTEGER,
        },
        precisionPayout: {
            type: DataTypes.INTEGER,
        },
        precisionTransfer: {
            type: DataTypes.INTEGER,
        },
    }, { sequelize, tableName: 'currency' });

    return Currency;
}
