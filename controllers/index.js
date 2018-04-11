const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/post', require('./post'));
router.use('/stories', require('./stories'));
router.use('/add', require('./add'));


module.exports = router;
