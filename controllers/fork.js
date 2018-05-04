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
    git()
    .clone('stories/' + story.Author + '/' + story.Title, 'stories/' + req.user.name + '/' + story.Title);
    Stories.create({
      Title: story.Title,
      Author: req.user.name,
      Description: story.Description,
      NumChapters: story.NumChapters,
    });
    res.redirect('/');
  });


});

module.exports = router;
