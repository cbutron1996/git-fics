const express = require('express');
const models = require('../models');
const router = express.Router();

const fs = require('fs');
const Stories = models.Stories;
const git = require('simple-git');

router.get('/:story', (req, res) => {
  Stories.findOne({
    where: { Title: req.params.story }
  }).then(story => {
    git('stories/' + req.params.story)
    .diff(['HEAD'],function(err, response) {
      if(err) return;
      res.end(response);
    });
  });
});

module.exports = router;
