const router = require('express').Router();
const models = require('../models');
const Users = models.Users;

router.get('/', (req, res) => {
  res.render('signup')
});

router.post('/', (req, res) => {
  Users.create({
    name: req.body.name,
    // email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    req.login(user, () =>
      res.redirect('/')
    );
  }).catch(() => {
    res.render('signup');
  });
});

module.exports = router;
