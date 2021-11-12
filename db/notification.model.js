const { Model, DataTypes } = require('sequelize');

class Notification extends Model {}
module.exports = (sequelize)=> {
    Notification.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        "recipients": DataTypes.ARRAY(DataTypes.STRING),
        "userId": {
            type: DataTypes.INTEGER
        },
        "content": DataTypes.STRING,
        "subject": DataTypes.STRING,
        "sent": DataTypes.DATE,
        "received": DataTypes.DATE,
        "reg": DataTypes.INTEGER,
        "templateKey": DataTypes.STRING,
        "arguments": {
            type: DataTypes.JSON
        }
    }, { sequelize, tableName: 'notification' });

    Notification.sendVerificationEmail = async function(user, token, url, options) {
        return Notification.create({
            type: 1,
            status: 0,
            recipients: [user.email],
            userId: user.id,
            content: "Email with verification",
            subject: "Email for verification",
            templateKey: 'registration.email',
            arguments: {
                NAME: user.name,
                TOKEN: token.code,
                URL: url
            }
        }, options);
    };

    return Notification;
}
