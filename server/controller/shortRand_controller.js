require('dotenv').config();
const base62 = require('base62-random');
const { checkAndSave } = require('../model/shortRand_model');
const poolArr = require('../../util/rdb');

const { SHORT_RAND_ENDPOINT } = process.env;

const postShortRand = async (req, res) => {
    console.log('POST from /shortUrl');

    const { url } = req.body;
    console.log(url);
    let total = 0;

    try {
        while (total++ < 100) {
            let shortUrl = base62(6);
            const pool = poolArr[0];
            const conn = await pool.getConnection();

            if (await checkAndSave(conn, url, shortUrl)) {
                return res.status(200).json({ data: SHORT_RAND_ENDPOINT + shortUrl });
            }
        }
        throw new Error('Out of iter limit!');
    } catch (err) {
        console.log(err);
        return res.status(500).send('QAQ');
    }
};

const getShortRand = async (req, res) => {
    console.log('GET from shortUrl/:shortUrl');
    const { shortUrl } = req.params;
    console.log('shortUrl:', shortUrl);
    const [result] = await poolArr[0].query('SELECT originalUrl FROM url WHERE shortUrl = ?', [shortUrl]);
    if (result.length === 0) {
        return res.status(404).json({ error: 'Not Found' });
    }
    // return res.status(200).json({data:result[0].originalUrl});
    return res.redirect(301, result[0].originalUrl);
};

const deleteShortRand = async (req, res) => {
    const { shortUrl } = req.query;
    const [result] = await pool.query('DELETE FROM url WHERE shortUrl = ?', [shortUrl]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Not Found' });
    }
    return res.status(200).json({ data: 'Success' });
};

module.exports = {
    postShortRand,
    getShortRand,
    deleteShortRand,
};
