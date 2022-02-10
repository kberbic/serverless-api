const Sequelize = require('sequelize');

class Database {
    #isConnected = false;
    #sequelize = null;
    #models = {};

    constructor(name, username, password, host, readOnlyHosts, ssl) {
        this.#sequelize = new Sequelize(name,  username, password, {
            dialect: 'postgres',
            port: 5432,
            dialectOptions: {
                encrypt: !!ssl,
                ...ssl,
                connectTimeout: 10000,
                options: {
                    requestTimeout: 3000
                }
            },
            replication: {
                read: readOnlyHosts.map(host=> ({ host })),
                write: { host }
            },
            pool: {
                max: 10,
                idle: 30000
            },
        });
    }

    async connect() {
        if (this.#isConnected) {
            return this.#models;
        }

        await this.#sequelize.sync({force: false});
        await this.#sequelize.authenticate();

        this.#isConnected = true;

        return this.#models;
    }

    transaction() {
        return this.#sequelize.transaction();
    }

    instance() {
        return this.#sequelize;
    }

    attachModels(models) {
        models.forEach(init => {
            const model = init(this.#sequelize, this.#models);
            this.#models[model.name] = model;
        });

        return this;
    }

    json(item){
        if(!item || !item.get) return item;
        return item.get({plain: true});
    }
}

module.exports = new Database(
    process.env.DBE_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    process.env.DB_HOST_PROXY || process.env.DB_HOST,
    [process.env.DB_READ_ONLY_HOST_PROXY || process.env.DB_READ_ONLY_HOST || process.env.DB_HOST],
    process.env.DB_TLS_DISABLED ? null : {ssl : { rejectUnauthorized: false }}
);
