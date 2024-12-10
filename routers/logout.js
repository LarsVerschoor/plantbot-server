const express = require('express');
const router = express.Router();
const authenticatedMiddleware = require('../middlewares/authenticated');
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const logoutController = require('../controllers/logout-controller');

router.get('/', authenticatedMiddleware, (req, res) => {
	res.render('authentication/logout', { layout: 'layouts/default-layout', title: 'Log out', csrfToken: req.session.csrfToken });
});

router.post('/', authenticatedMiddleware, csrfProtectionMiddleware, logoutController);

module.exports = router;
