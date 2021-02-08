const express = require('express');
const passport = require('passport');

const userControllers = require('../controllers/user');

const router = new express.Router();

router.post('/register', userControllers.createUser);

router.post(
	'/login',
	passport.authenticate('local', { session: false }),
	userControllers.userLogin
);

router.get('/logout', passport.authenticate('jwt', { session: false }), userControllers.userLogout);

router.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	userControllers.isAuthenticated
);

module.exports = router;
