require('dotenv').config();
const base62 = require('base62-random');
const { checkAndSave } = require('../model/shortRand_model');
const poolArr = require('../../util/rdb');

const { SHORT_UNIQUE_ENDPOINT } = process.env;

const postShortUnique = async (req, res) => {
    console.log('POST from /shortUnique');

    const { url } = req.body;
    console.log(url);
    let total = 0;

    try {
        while (total++ < 100) {
            let shortUrl = base62(6);
            
            try{
                await poolArr[0].query('INSERT INTO urlbyunique (originalUrl,shortUrl) VALUES (?,?)', [url, shortUrl]);
                return res.status(200).json({ data: SHORT_UNIQUE_ENDPOINT + shortUrl });
            }catch {
                console.log('already exit')
                continue
            }
        }
        throw new Error('Out of iter limit!');
    } catch (err) {
        console.log(err);
        return res.status(500).send('QAQ');
    }
};


const getShortUnique = async (req, res) => {
    console.log('GET from /shortUrlUnique/:shortUrl');
    const { shortUrl } = req.params;
    console.log('shortUrl:', shortUrl);
    const [result] = await poolArr[0].query('SELECT originalUrl FROM urlbyunique WHERE shortUrl = ?', [shortUrl]);
    if (result.length === 0) {
        return res.status(404).json({ error: 'Not Found' });
    }
    // return res.status(200).json({data:result[0].originalUrl});
    return res.redirect(301, result[0].originalUrl);
};



module.exports = {
    postShortUnique,
    getShortUnique
};
