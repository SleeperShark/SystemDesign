require('dotenv').config();
const mysql = require('mysql2/promise');

const poolWrite = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 25,
    queueLimit: 0,
});

const poolRead00 = mysql.createPool({
    host: process.env.DB_HOST_READ_00,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 25,
    queueLimit: 0,
});


const poolRead01 = mysql.createPool({
    host: process.env.DB_HOST_READ_01,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 25,
    queueLimit: 0,
});

const poolRead02 = mysql.createPool({
    host: process.env.DB_HOST_READ_02,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 25,
    queueLimit: 0,
});



module.exports = [[poolWrite], [ poolRead00, poolRead01, poolRead02]];
