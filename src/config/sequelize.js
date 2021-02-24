const { DatabaseConfig } = require('.');

module.exports = {
    development: DatabaseConfig('development'),
    test: DatabaseConfig('test'),
    production: DatabaseConfig('production')
};
