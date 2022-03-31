const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const { postShortUrlByKGS, getShortUrlByKGS } = require('../controller/shortKGS_controller');

router.route('/shortUrlByKGS').post(wrapAsync(postShortUrlByKGS));
router.route('/shortUrlByKGS/:shortUrl').get(wrapAsync(getShortUrlByKGS));

module.exports = router;
