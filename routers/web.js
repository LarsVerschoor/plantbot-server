const express = require('express');
const plantbotsRouter = require('./plantbots');
const webRouter = express.Router();

webRouter.use('/plantbots', plantbotsRouter);

webRouter.get('/', (req, res) => {
	res.render('homepage/index', { title: 'Home' });
});

module.exports = webRouter;
