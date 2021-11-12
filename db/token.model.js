const { Model, DataTypes } = require('sequelize');
const { addMinutes } = require('date-fns');
const crypto = require('crypto');

class Token extends Model {}
module.exports = (sequelize)=>{
    Token.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        expiresAt: DataTypes.DATE,
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { sequelize, tableName: 'token' });

    Token.generateToken = async function(type, ref, options) {
        let code;
        while (!code) {
            code = crypto.randomBytes(4).toString('hex');
            const count = await Token.count({where: {code: code, used: false}});
            if (count)
                code = undefined;
        }

        code = code.toUpperCase();
        return Token.create({
            ref,
            code,
            type,
            used: false,
            expiresAt: addMinutes(new Date(), 60)
        }, options);
    };

    return Token;
}
