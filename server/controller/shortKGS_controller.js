require('dotenv').config();
const Cache = require('../../util/cache');
const { checkCache } = require('../model/shortKGS_model');
const poolArr = require('../../util/rdb');

const { SHORT_KGS_ENDPOINT } = process.env;
Cache.connect();

const postShortUrlByKGS = async (req, res) => {
    const { url } = req.body;
    console.log('url:', url);

    let shortUrl = await checkCache();
    console.log(shortUrl);
    const conn = await poolArr[0].getConnection();
    try {
        conn.query('START TRANSACTION');
        await conn.query('INSERT INTO urlbykgs (originalUrl,shortUrl) VALUES (?,?)', [url, shortUrl]);
        conn.query('COMMIT');
        return res.status(200).json({ data: SHORT_KGS_ENDPOINT + shortUrl });
    } catch (err) {
        console.log(err);
        conn.query('ROLLBACK');
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        conn.release();
    }
};

const getShortUrlByKGS = async (req, res) => {
    console.log('GET from shortUrlByKGS/:shortUrl');
    const { shortUrl } = req.params;
    const [result] = await poolArr[0].query('SELECT originalUrl FROM urlbykgs WHERE shortUrl = ?', [shortUrl]);
    if (result.length === 0) {
        return res.status(404).json({ error: 'Not Found' });
    }
    // return res.status(200).json({data:result[0].originalUrl});
    return res.redirect(301, result[0].originalUrl);
};

module.exports = {
    postShortUrlByKGS,
    getShortUrlByKGS,
};
