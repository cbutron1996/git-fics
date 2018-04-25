const express = require('express');
const models = require('../models');
const router = express.Router();

const git = require('simple-git');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Stories = models.Stories;
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/:story', (req, res) => {
  // mkdirp('./stories/clones/' + req.body.title); // makes new folder
  git()
  .clone('stories/' + req.params.story, 'stories/clones/' + req.params.story);
  res.render('home');
});

module.exports = router;
