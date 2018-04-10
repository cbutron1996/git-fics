const express = require('express');
const models = require('../models');
const router = express.Router();

const git = require('simple-git');
const mkdirp = require('mkdirp');
const fs = require('fs');
const Stories = models.Stories;

router.get('/', (req, res) => {
  res.render('post');
});

router.post('/', (req, res) => {
  mkdirp('./stories/' + req.body.title); // makes new folder
  fs.writeFile("./stories/" + req.body.title + "/chapter1.txt", req.body.content);
  git('stories/' + req.body.title)
  .init()
  .add('./*')
  .commit("first commit!");
  Stories.create({
    Title: req.body.title,
    Author: req.body.author,
    Description: req.body.description,
    NumChapters: 10,
  });
  res.render('post');
});

module.exports = router;
