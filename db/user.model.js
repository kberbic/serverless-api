const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

class User extends Model {}
module.exports = (sequelize, {Country})=>{
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: DataTypes.STRING,
        appURL : {
            type: DataTypes.STRING,
            allowNull: false
        },
        terms: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, { sequelize, tableName: 'users' });

    User.generateHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };

    User.prototype.validPassword = function(password) {
        if (!this.password)
            return false;

        return bcrypt.compareSync(password, this.password);
    };

    User.prototype.getJWT = function() {
        return jwt.sign({
            sub: this.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h',
            issuer: 'accounts.examplesoft.com',
            audience: 'yoursite.net',
        });
    };

    User.belongsTo(Country, {as: 'Country'});

    return User;
};
