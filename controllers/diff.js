const express = require('express');
const models = require('../models');
const router = express.Router();

const fs = require('fs');
const Stories = models.Stories;
const git = require('simple-git');

router.get('/:author/:title', (req, res) => {
  Stories.findOne({
    where: { Title: req.params.title, Author: req.params.author }
  }).then(story => {
    git('stories/' + story.Author + '/' + story.Title)
    .diff(['HEAD'],function(err, response) {
      if(err) return;
      res.end(response);
    });
  });
});

module.exports = router;
