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

router.post('/:author/:title', (req, res) => {
  Stories.findOne({
    where: { Author: req.params.author, Title: req.params.title }
  }).then(story => {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    let file = req.files.textFile;
    mkdirp('./stories/' + story.Author + '/' + story.Title); // makes new folder
    file.mv('./stories/' + story.Author + '/' + story.Title + '/' + file.name, function(err) {
      if (err)
        return res.status(500).send(err);
    });
    git('stories/' + story.Author + '/' + story.Title)
    .add('./*')
    .commit("Added " + file.name);
    res.redirect('/');
  });
});

module.exports = router;
