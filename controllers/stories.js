const express = require('express');
const models = require('../models');
const router = express.Router();

const fs = require('fs');
const Stories = models.Stories;

router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.get('/:id', (req, res) => {
  var text = fs.readFileSync('./stories/' + req.params.id + '/chapter1.doc', 'utf8');
  // res.render('story', {
  //   title: req.params.id,
  //   story: text,
  // });
  Stories.findOne({
    where: { Title: req.params.id }
  }).then(story => {
    res.render('story', {
      title: story.Title,
      author: story.Author,
      description: story.Description,
      content: text,
    });
  });
});

module.exports = router;
