const ServerRest = require('../utils/rest.utils');
const db = require('../db');

class CountryController{
    async getAll() {
        const {Country} = await db.connect();
        return await Country
            .findAll()
            .then((items) => items.map(({id, name}) => ({id, name})));
    }
    async getOne(event) {
        const {pathParameters: {id}} = event;
        const {Country} = await db.connect();
        return await Country
            .findOne({where: {id}})
            .then(db.json);
    }
}

module.exports = ServerRest.attach(new CountryController());
