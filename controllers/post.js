const express = require('express');
const models = require('../models');

const router = express.Router();
const git = require('simple-git');
const mkdirp = require('mkdirp');

router.get('/', (req, res) => {
  res.render('post');
});

router.post('/', (req, res) => {
  mkdirp('./stories/' + req.body.title); // makes new folder
  git('stories/' + req.body.title).init(); // inits folder as new repo
  res.render('post');
});

module.exports = router;
