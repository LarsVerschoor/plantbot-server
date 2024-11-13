const express = require('express');
const plantbotsRouter = express.Router();

plantbotsRouter.get('/', (req, res) => {
	res.send('Plantbots page');
});

module.exports = plantbotsRouter;
