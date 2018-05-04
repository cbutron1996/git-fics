const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/post', require('./post'));
router.use('/stories', require('./stories'));
router.use('/add', require('./add'));
router.use('/diff', require('./diff'));
router.use('/fork', require('./fork'));
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/pr', require('./pr'));
router.use('/prs', require('./prs'));
router.use('/pull', require('./pull'));


module.exports = router;
