const express = require('express');
const models = require('../models');
const router = express.Router();

const git = require('simple-git');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Stories = models.Stories;
const PRs = models.PRs;

router.post('/:author/:title', (req, res) => {
  PRs.findOne({
    where: { Head: req.params.author, Title: req.params.title }
  }).then(pr => {

    git('stories/' + pr.Base + '/' + pr.Title)
    .pull('/Users/christianbutron/projects/git-fics/stories/' + pr.Head + '/' + pr.Title, 'master');

    git('stories/' + pr.Head + '/' + pr.Title).pull();

    res.redirect('/');
  });
});

module.exports = router;
