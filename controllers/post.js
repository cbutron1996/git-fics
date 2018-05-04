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
  let file = req.files.textFile;
  mkdirp('./stories/' + req.user.name + '/' + req.body.title); // makes new folder
  file.mv('./stories/' + req.user.name + '/' + req.body.title + '/' + file.name, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  git('stories/' + req.user.name + '/' + req.body.title)
  .init()
  .add('./*')
  .commit("first commit!");
  Stories.create({
    Title: req.body.title,
    Author: req.user.name,
    Description: req.body.description,
    NumChapters: 1,
  });
  res.redirect('/');
});

module.exports = router;
