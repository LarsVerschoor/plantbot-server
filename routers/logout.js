const express = require('express');
const router = express.Router();
const authenticatedMiddleware = require('../middlewares/authenticated');

router.get('/', authenticatedMiddleware, (req, res) => {
	res.render('authentication/logout', { layout: 'layouts/default-layout', title: 'Log out', csrfToken: req.session.csrfToken });
});

module.exports = router;
