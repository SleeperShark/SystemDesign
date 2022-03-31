require('dotenv').config();
const Cache = require('../../util/cache');
const poolArr = require('../../util/rdb');

const selectSql = `
    SELECT id, shortUrl 
    FROM kiss
    WHERE used = '0'
    ORDER BY id LIMIT ?;
    `;

const updateSql = `
    UPDATE kiss 
    SET used = '1' 
    WHERE id in (?)
    `;

async function checkCache() {
    const limit = 100000;
    let key = await Cache.rPop('key');
    if (!key) {
        console.log('Require data from db');
        let [keys] = await poolArr[0].query(selectSql, limit);
        let cacheKeys = [];
        let removeIds = [];
        keys.forEach((element) => {
            cacheKeys.push(element.shortUrl);
            removeIds.push(element.id);
        });

        await Cache.lPush('key', cacheKeys);
        key = await Cache.rPop('key');
        await poolArr[0].query(updateSql, [removeIds]);
    }
    return key;
}

module.exports = { checkCache };
