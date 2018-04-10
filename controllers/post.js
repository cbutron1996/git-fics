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
  res.render('post');
});

router.post('/', (req, res) => {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  let sampleFile = req.files.textFile;
  mkdirp('./stories/' + req.body.title); // makes new folder
  sampleFile.mv('./stories/' + req.body.title + '/chapter1.doc', function(err) {
    if (err)
      return res.status(500).send(err);
  });
  git('stories/' + req.body.title)
  .init()
  .add('./*')
  .commit("first commit!");
  Stories.create({
    Title: req.body.title,
    Author: req.body.author,
    Description: req.body.description,
    NumChapters: 10,
  });
  res.render('post');
});

module.exports = router;
