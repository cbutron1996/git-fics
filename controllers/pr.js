const express = require('express');
const models = require('../models');
const router = express.Router();

const git = require('simple-git');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Stories = models.Stories;
const PRs = models.PRs;

router.post('/:author/:title', (req, res) => {
  if(req.params.author == req.user.name) {
    res.redirect('/');
    return;
  }
  Stories.findOne({
    where: { Author: req.params.author, Title: req.params.title }
  }).then(story => {
    PRs.create({
      Title: story.Title,
      Base: story.Author,
      Head: req.user.name,
    });
    console.log("PR Title: " + story.Title + " Base: " + story.Author + " Head: " + req.user.name);
  });
  res.redirect('/');
});

module.exports = router;
