const { Model, DataTypes } = require('sequelize');

class Transaction extends Model {}
module.exports = (sequelize, {User})=> {
    Transaction.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ref: DataTypes.STRING,
        in: DataTypes.STRING,
        out: DataTypes.STRING,
        amount: DataTypes.DOUBLE,
        amountFee: DataTypes.DOUBLE,
        amountOut: DataTypes.DOUBLE,
        payout: DataTypes.DOUBLE,
        payoutFee: DataTypes.DOUBLE,
        exchange: DataTypes.DOUBLE,
        email:  DataTypes.STRING,
        name:  DataTypes.STRING,
        card:  DataTypes.JSON,
        address:  DataTypes.STRING,
        qrCodeURL:  DataTypes.STRING,
        rate: DataTypes.DOUBLE,
        trackUrl:  DataTypes.STRING,
        status: DataTypes.INTEGER, // 1 - pending, 2 - confirmed, 3 - sent to amex, 4 - cancelled, 5 - failed
    }, { sequelize, tableName: 'transaction' });

    Transaction.belongsTo(User, {as: 'User'});

    return Transaction;
}
