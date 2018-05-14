import DEV_CONFIG from './config/config.dev';
import PROD_CONFIG from './config/config.prod';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

export default () => {

    let ENV = null;
    if (process.env['ENV'] === 'development') {
        ENV = DEV_CONFIG;
    } else {
        ENV = PROD_CONFIG;
    }

    process.env['ROOT'] = __dirname;
    process.env['PORT'] = process.env['PORT'] || ENV['PORT'];
    process.env['WEBAPP_INDEX'] = ENV['WEBAPP_INDEX'];
    process.env['WEBAPP_STATIC'] = ENV['WEBAPP_STATIC'];
}

function getENV(type) {
    let DB_CONFIG = null;
    let fileData = null;
    if (process.env['ENV'] === 'development') {
        try {
            fileData = fs.readFileSync(path.join(__dirname, '../.env.' + type + '.local'));
            DB_CONFIG = dotenv.parse(fileData);
        } catch (error) {
            try {
                fileData = fs.readFileSync(path.join(__dirname, '../.env.' + type));
                DB_CONFIG = dotenv.parse(fileData);
            } catch (error) { }
        }
    } else {
        try {
            fileData = fs.readFileSync(path.join(__dirname, '../../.env.' + type));
            DB_CONFIG = dotenv.parse(fileData);
        } catch (error) { }
    }
    return DB_CONFIG;
};