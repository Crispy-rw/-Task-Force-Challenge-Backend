const Sequelize = require('sequelize');
const debug = require('debug')('Database');

const { DatabaseConfig, AppConfig } = require('.');

const dbEnvironment = DatabaseConfig(AppConfig.environment);

module.exports = new Sequelize(
    dbEnvironment.database,
    dbEnvironment.username,
    dbEnvironment.password,
    {
        dialect: dbEnvironment.dialect,
        dialectOptions: dbEnvironment.dialectOptions,
        host: dbEnvironment.host,
        port: dbEnvironment.port,
        ssl: dbEnvironment.ssl,
        timezone: dbEnvironment.timezone,
        version: true,
        paranoid: true,
        logging: msg => {
            debug(msg);
        },
    }
);
