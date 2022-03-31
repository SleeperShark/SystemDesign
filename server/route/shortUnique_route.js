const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const { postShortUnique, getShortUnique } = require('../controller/shortUnique_controller');

router.route('/shortUrlUnique').post(wrapAsync(postShortUnique));
router.route('/shortUrlUnique/:shortUrl').post(wrapAsync(getShortUnique));


module.exports = router;
