const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/post', require('./post'));
router.use('/stories', require('./stories'));
router.use('/add', require('./add'));
router.use('/diff', require('./diff'));
router.use('/fork', require('./fork'));


module.exports = router;
