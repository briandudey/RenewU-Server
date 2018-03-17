const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportService = require('../passport/local');

// //role types
// const REQUIRE_MEMBER = 'Member';
// const REQUIRE_CLIENT = 'Client';
// const REQUIRE_OWNER = 'Owner';

//Google auth
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

//Google auth callback
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login'
	}),
	(req, res) => {
		res.redirect('/');
	}
);

//Google auth verify
router.get('/verify', (req, res) => {
	if (req.user) {
		console.log(req.user);
	} else {
		console.log('not auth');
	}
});

//Google auth logout
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
