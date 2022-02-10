const db = require('./sequelize');

const UserInfo = require('./userInfo.model');
const Country = require('./country.model');
const Currency = require('./currency.model');

module.exports = db.attachModels([
    Country,
    Currency,
    UserInfo,
]);
