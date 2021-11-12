const ServerRest = require('../utils/rest.utils');
const logger = require("../utils/logger.utils");

const db = require('../db');
const { Umzug, SequelizeStorage } = require('umzug');

class MigrationsController{
    async up(event) {
        const umzug = new Umzug({
            migrations: {glob: 'migrations/*.js'},
            context: await db.connect(),
            storage: new SequelizeStorage({ sequelize: db.instance()}),
            logger: logger,
        });

        await umzug.up();

        return {success: true};
    }

    async down(event) {
        const umzug = new Umzug({
            migrations: {glob: 'migrations/*.js'},
            context: await db.connect(),
            storage: new SequelizeStorage({ sequelize: db.instance()}),
            logger: logger,
        });

        await umzug.down();

        return {success: true};
    }
}

module.exports = ServerRest.attach(new MigrationsController());
