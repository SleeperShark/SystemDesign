require('dotenv').config();
const ascii = require('base62/lib/ascii');
const base62 = require('base62');
const poolArr = require('../../util/rdb');

const { SHORT_KEY_ENDPOINT, DB_AMOUNT, KEY_FILLTER } = process.env;

let dbIndex = 0;

const postShortUrlByKey = async (req, res) => {
    console.log('POST from /shortUrlByKey');
    let shortUrl;
    const { url } = req.body;
//    if (url > 56800235584) {
//        console.log('url is too longggggggg');
//        return res.status(400).json({ error: 'url is too longggggggg' });
//    }
//    const conn = await poolArr[dbIndex].getConnection();
    try {
        let [insertRes] = await poolArr[dbIndex].query('INSERT INTO urlbykey set originalUrl = ?', [url]);
        console.log(insertRes);
        let id = insertRes.insertId;
        console.log(id);
        let shortUrlCode = ascii.encode(id);
        if (shortUrlCode.length < 6) {
            shortUrl = (KEY_FILLTER + shortUrlCode).slice(-6);
            console.log(`The length ${shortUrl} is shorter than 6.`);
        }
        if (dbIndex < DB_AMOUNT - 1) {
            dbIndex++;
        } else {
            dbIndex = 0;
        }

        console.log(SHORT_KEY_ENDPOINT + dbIndex + shortUrl);
        return res.status(200).json({ data: SHORT_KEY_ENDPOINT + dbIndex + shortUrl });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getShortUrlByKey = async (req, res) => {
    console.log('GET from shortUrlByKey/:shortUrl');
    const { shortUrl } = req.params;
    const id = Number(base62.decode(shortUrl.slice(-6)));
    const [result] = await poolArr[0].query('SELECT originalUrl FROM urlbykey WHERE id = ?', [id]);
    if (result.length === 0) {
        return res.status(404).json({ error: 'Not Found' });
    }
    // return res.status(200).json({data:result[0].originalUrl});
    return res.redirect(301, result[0].originalUrl);
};

module.exports = {
    postShortUrlByKey,
    getShortUrlByKey,
};
