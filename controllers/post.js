const express = require('express');
const models = require('../models');

const router = express.Router();
const git = require('simple-git');
const mkdirp = require('mkdirp');
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('post');
});

router.post('/', (req, res) => {
  mkdirp('./stories/' + req.body.title); // makes new folder
  fs.writeFile("./stories/" + req.body.title + "/chapter1.txt", req.body.story);
  git('stories/' + req.body.title)
  .init()
  .add('./*')
  .commit("first commit!");
  res.render('post');
});

module.exports = router;
