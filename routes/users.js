const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync (users.register))



router.get('/login', users.login)

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.authLogin)

router.get('/logout', users.logout)


module.exports = router;