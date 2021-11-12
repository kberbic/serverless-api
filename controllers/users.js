const ServerRest = require('../utils/rest.utils');
const logger = require("../utils/logger.utils");

const {BedRequestError} = require('../errors/badrequest.error');
const {ForbiddenError} = require('../errors/forbidden.error');


const db = require('../db');

class UserController{
    async create(event) {
        const {input: user} = event;

        const {User, Token, Country, Notification, Card} = await db.connect();

        const count = await User.count({where: {email: user.email}});
        if (count)
            throw new BedRequestError("Email already exist");

        const countryCount = await Country.count({where: {id: user.countryId}});
        if (!countryCount)
            throw new BedRequestError("Country does not exist");

        user.password = User.generateHash(user.password);
        const transaction = await db.transaction();
        await User.create(user, {transaction})
            .then((dbUser) => Token.generateToken(0, dbUser.id, {transaction})
                .then(token => Notification.sendVerificationEmail(dbUser, token, user.appURL, {transaction})))
            .then((not) => Card.create({userId: not.userId, ...user.bankAccount}, {transaction}))
            .then(() => transaction.commit())
            .catch(async (ex) => {
                await transaction.rollback();
                throw ex;
            });

        return {success: true};
    }

    async login(event) {
        const {input: login} = event;

        const {User} = await db.connect();
        const user = await User.findOne({where: {email: login.email}});
        if (!user)
            throw new ForbiddenError("IncorrectEmailOrPassword");

        if (!user.validPassword(login.password))
            throw new ForbiddenError("IncorrectEmailOrPassword");

        res.set('Authorization', `Bearer ${user.getJWT()}`);
        return {success: true};
    }

    async countries(event) {
        const {input: login} = event;

        const {Country} = await db.connect();
        return await Country
            .findAll()
            .then((items) => items.map(({id, name}) => ({id, name})));
    }
}

module.exports = ServerRest.attach(new UserController());
