require('dotenv').config();
const mysql = require('mysql2/promise');

const pool0 = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 55,
    queueLimit: 0,
});
/*
const pool1 = mysql.createPool({
    host: process.env.DB_HOST_01,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
*/
module.exports = [pool0, null];
