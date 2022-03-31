const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const { postShortUrlByKey, getShortUrlByKey } = require('../controller/shortKey_controller');

router.route('/shortUrlByKey').post(wrapAsync(postShortUrlByKey));
router.route('/shortUrlByKey/:shortUrl').get(wrapAsync(getShortUrlByKey));

module.exports = router;
