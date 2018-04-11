const express = require('express');
const models = require('../models');
const router = express.Router();

const fs = require('fs');
const Stories = models.Stories;
const git = require('simple-git');

router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.get('/:story', (req, res) => {
  Stories.findOne({
    where: { Title: req.params.story }
  }).then(story => {
    // var text = fs.readFileSync('./stories/' + story.Title + '/storysample.doc', 'utf8');
    fs.readdir('./stories/' + story.Title + '/', function(err, filenames) {
      if(err) return;
      filenames.forEach(function(part, index, array) {
        // fs.readFile('./stories/' + story.Title + '/' + filename, 'utf-8');
        array[index] = "http://localhost:8000/stories/" + story.Title + "/" + array[index];
      });
      res.render('story', {
        title: story.Title,
        author: story.Author,
        description: story.Description,
        content: filenames,
      });
    });
  });
});

router.get('/:story/:chapter', (req, res) => {
  Stories.findOne({
    where: { Title: req.params.story }
  }).then(story => {
    var text = fs.readFileSync('./stories/' + story.Title + '/' + req.params.chapter, 'utf-8');
    res.end(text);
  });
});

module.exports = router;
