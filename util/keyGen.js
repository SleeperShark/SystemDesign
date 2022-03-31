
const ascii = require('base62/lib/ascii');
const poolArr = require('./rdb');
const { shuffle } = require('./util');

let keys = [];
for (let i = 0; i < 500000; i++) {
    let key = '00000';
    key = (key + ascii.encode(i)).slice(-6);
    keys.push(key);
}

keys = shuffle(keys);
const kissData = keys.map((key) => {
    return [key, false];
});

async function insertKeys() {
    const conn = await poolArr[0].getConnection();
    await conn.query('INSERT INTO kiss (shortUrl,used) VALUES ?', [kissData]);
    console.log("hehe");
    await conn.release();
}

async function execute() {
    console.log("stardo!");
    await insertKeys();
    console.log('Service Finish.');
}

execute();

// module.exports = { execute };
