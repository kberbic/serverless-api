const { Model, DataTypes } = require('sequelize');

class Card extends Model {}
module.exports = (sequelize, {User})=>{
    Card.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        trn: DataTypes.STRING, // for now we will collect transaction number
        iban: DataTypes.STRING, // for internation payments, will not support this in first versions
        number: DataTypes.STRING, // for latter payments, right now we don't know how to get TR from number
    }, { sequelize, tableName: 'card' });

    Card.belongsTo(User, {as: 'User'});

    return Card;
}
