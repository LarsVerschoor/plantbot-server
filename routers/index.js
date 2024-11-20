const express = require('express');
const plantbotsRouter = require('./plantbots');
const loginRouter = require('./login');
const registerRouter = require('./register');
const authenticatedMiddleware = require('../middlewares/authenticated');

const router = express.Router();

router.use('/plantbots', plantbotsRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);

router.get('/', authenticatedMiddleware, (req, res) => {
	res.render('homepage/index', { title: 'Home' });
});

module.exports = router;
