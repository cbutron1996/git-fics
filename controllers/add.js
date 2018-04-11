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

router.post('/:title', (req, res) => {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let file = req.files.textFile;
  mkdirp('./stories/' + req.params.title); // makes new folder
  file.mv('./stories/' + req.params.title + '/' + file.name, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  res.render('home');
});

module.exports = router;
