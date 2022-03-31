const router = require('express').Router();
const { wrapAsync } = require('../../util/util');

const { postShortRand, getShortRand, deleteShortRand } = require('../controller/shortRand_controller');

router.route('/shortUrl').post(wrapAsync(postShortRand));
router.route('/shortUrl/:shortUrl').get(wrapAsync(getShortRand));
router.route('/shortUrl').delete(wrapAsync(deleteShortRand));

module.exports = router;
