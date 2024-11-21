const express = require('express');
const router = express.Router();
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const verifyAccountController = require('../controllers/verify-account-controller');

router.get('/*', unauthenticatedMiddleware, (req, res) => {
	res.render('authentication/verify-account', { layout: 'layouts/default-layout', title: 'Register', csrfToken: req.session.csrfToken });
});

router.post('/:uuid', unauthenticatedMiddleware, csrfProtectionMiddleware, verifyAccountController);

module.exports = router;
