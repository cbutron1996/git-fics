const express = require('express');
const models = require('../models');

const router = express.Router();
const git = require('simple-git');
const mkdirp = require('mkdirp');

router.get('/:id', (req, res) => {
  res.json({
    msg: "Here we create a story (a new git repo)"
  });
});

router.post('/:id', (req, res) => {
  mkdirp('./stories/' + req.params.id); // makes new folder
  git('stories/' + req.params.id).init(); // inits folder as new repo
  res.json({
    msg: "Successful story posted."
  });
});

module.exports = router;
