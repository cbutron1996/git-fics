const express = require('express');
const models = require('../models');
const router = express.Router();

const Stories = models.Stories;


router.get('/', (req, res) => {
  Stories.findAll().then(stories => {
    res.render('home', { stories: stories, user: req.user});
  });
});

router.post('/', (req, res) => {
  res.json({
    msg: "Successful POST to '/' route"
  });
});

router.put('/:id', (req, res) => {
  res.json({
    msg: "Successful PUT to '/' route",
    id: req.params.id
  });
});

router.delete('/:id', (req, res) => {
  res.json({
    msg: "Successful DELETE to '/' route",
    id: req.params.id
  });
});


module.exports = router;
