const express = require('express');
const models = require('../models');

const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.get('/:id', (req, res) => {
  var text = fs.readFileSync('./stories/' + req.params.id + '/chapter1.txt', 'utf8');
  res.send(text);
});

module.exports = router;
