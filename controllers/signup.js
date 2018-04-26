const router = require('express').Router();
const models = require('../models');
const Users = models.Users;
const mkdirp = require('mkdirp');

router.get('/', (req, res) => {
  res.render('signup')
});

router.post('/', (req, res) => {
  Users.create({
    name: req.body.name,
    // email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    mkdirp('./stories/' + req.body.name); // makes new folder
    req.login(user, () =>
      res.redirect('/')
    );
  }).catch(() => {
    res.render('signup');
  });
});

module.exports = router;
