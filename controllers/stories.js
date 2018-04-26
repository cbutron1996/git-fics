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

router.get('/:author/:title', (req, res) => {
  Stories.findOne({
    where: { Author: req.params.author, Title: req.params.title }
  }).then(story => {
    // var text = fs.readFileSync('./stories/' + story.Title + '/storysample.doc', 'utf8');
    fs.readdir('./stories/' + story.Author + '/' + story.Title + '/', function(err, filenames) {
      if(err) return;
      filenames.forEach(function(part, index, array) {
        // fs.readFile('./stories/' + story.Title + '/' + filename, 'utf-8');
        array[index] = "http://localhost:8000/stories/" + story.Author + "/" + story.Title + "/" + array[index];
      });
      filenames.splice(0,1);
      res.render('story', {
        title: story.Title,
        author: story.Author,
        description: story.Description,
        content: filenames,
      });
    });
  });
});

router.get('/:author/:title/:chapter', (req, res) => {
  Stories.findOne({
    where: { Author: req.params.author, Title: req.params.title }
  }).then(story => {
    var text = fs.readFileSync('./stories/' + story.Author + '/' + story.Title + '/' + req.params.chapter, 'utf-8');
    res.end(text);
  });
});

module.exports = router;
