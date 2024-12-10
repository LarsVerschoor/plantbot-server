const express = require('express');
const plantbotsRouter = require('./plantbots');
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');
const verifyAccountRouter = require('./verify-account.js');
const authenticatedMiddleware = require('../middlewares/authenticated');

const router = express.Router();

router.use('/plantbots', plantbotsRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/logout', logoutRouter);
router.use('/verify-account', verifyAccountRouter);

router.get('/', authenticatedMiddleware, (req, res) => {
	res.render('homepage/index', { layout: 'layouts/default-layout', title: 'Home' });
});

module.exports = router;
