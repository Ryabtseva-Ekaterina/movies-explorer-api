const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const { createUser, login } = require('../controllers/users');
const { signinValidate, signupValidate } = require('../middleware/validate');
const auth = require('../middleware/auth');
const NotFound = require('../errors/notFound');

router.post('/signin', signinValidate, login);
router.post('/signup', signupValidate, createUser);

router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.use('*', auth, (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
