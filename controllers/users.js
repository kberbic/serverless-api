
const ServerRest = require('../utils/rest.utils');
const {BedRequestError} = require('../errors/badrequest.error');
const { NoContentError } = require('../errors/noContent.error');
const db = require('../db');

class UserController{
    async updateInfo(event) {
        const {input: info, requestContext: {authorizer}} = event;
        const {UserInfo, Country, Currency} = await db.connect();

        const country = await Country.findOne({where: {id: info.countryId}})
        if(!country) throw new BedRequestError("COUNTRY_DOES_NOT_EXIST");

        const currency = info.currencyId ? await Currency.findOne({where: {id: info.currencyId}}): null;
        if(info.currencyId && !currency) throw new BedRequestError("CURRENCY_DOES_NOT_EXIST");
        
        let userInfo = await UserInfo.findOne({where: {id: authorizer.claims.sub}}).then(db.json);

        if(!userInfo)
            userInfo = await UserInfo.create({id: authorizer.claims.sub, ...info}).then(db.json);
        else
            await UserInfo.update(info, { where: { id: authorizer.claims.sub }}).then(db.json);

        return {id: authorizer.claims.sub};
    }

    async getInfo(event) {
        const {requestContext: {authorizer}} = event;
        const {UserInfo} = await db.connect();

        let userInfo = await UserInfo.findOne({where: {id: authorizer.claims.sub}}).then(db.json);

        if(!userInfo) throw new NoContentError("USER_INFO_DOES_NOT_CREATED_YET");
       
        return {id: userInfo.id, address: userInfo.address, postalCode: userInfo.postalCode, countryId: userInfo.countryId};
    }
}

module.exports = ServerRest.attach(new UserController());
