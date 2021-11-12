const db = require('./sequelize');

const User = require('./user.model');
const Country = require('./country.model');
const Token = require('./token.model');
const Transaction = require('./transaction.model');
const Notification = require('./notification.model');
const Currency = require('./currency.model');
const Card = require('./card.model');

module.exports = db.attachModels([
    Token,
    Country,
    User,
    Transaction,
    Currency,
    Card,
    Notification
]);
