const express = require('express');
const models = require('../models');
const router = express.Router();

const git = require('simple-git');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Stories = models.Stories;
const PRs = models.PRs;

router.get('/:author/:title', (req, res) => {
  Stories.findOne({
    where: { Author: req.params.author, Title: req.params.title }
  }).then(story => {
    PRs.findAll({
      where: { Base: story.Author, Title: story.Title }
    }).then(prs => {
      res.render('prs', { prs: prs, user: req.user });
    });
  });
});

module.exports = router;
