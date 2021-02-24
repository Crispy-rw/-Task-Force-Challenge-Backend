const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

exports.AppConfig = {
    timezone: process.env.TIMEZONE,
    environment: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    hostname: process.env.APP_HOST,
    appName: process.env.APP_NAME,
};

exports.EmailConfig = {
    domain: process.env.MAIL_DOMAIN_NAME,
};

exports.FirebaseConfig = {};

exports.DatabaseConfig = environment => {
    environment = environment.toUpperCase();
    return {
        dialect: process.env.DB_DRIVER,
        host: process.env[`DB_${environment}_HOST`],
        port: process.env[`DB_${environment}_PORT`],
        username: process.env[`DB_${environment}_USER`],
        password: process.env[`DB_${environment}_PASSWORD`],
        database: process.env[`DB_${environment}_NAME`],
        timezone: process.env.TIMEZONE,
        ssl: process.env[`DB_${environment}_SSL`] === 'TRUE',
        dialectOptions: (() => {
            return process.env[`DB_${environment}_SSL`] === 'TRUE'
                ? { ssl: { cert: fs.readFileSync(path.resolve('ca-certificate.crt')) } }
                : {};
        })(),
    };
};
