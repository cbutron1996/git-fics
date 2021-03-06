const express = require('express');
const models = require('../models');
const router = express.Router();

const fs = require('fs');
const Stories = models.Stories;
const git = require('simple-git');

router.get('/:author/:title', (req, res) => {
  Stories.findOne({
    where: { Author: req.params.author, Title: req.params.title }
  }).then(story => {
    git('stories/' + story.Author + '/' + story.Title)
    .diff(['origin'],function(err, response) {
      if(err) return;
      res.end(response);
    });
  });
});

module.exports = router;
