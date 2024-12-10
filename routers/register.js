const express = require('express');
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const noPendingRegistrationMiddleware = require('../middlewares/pendingRegistration')(false);
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const validateCredentialsMiddleware = require('../middlewares/validate-credentials');
const registerController = require('../controllers/register-controller');

const router = express.Router();

router.get('/', unauthenticatedMiddleware, noPendingRegistrationMiddleware, (req, res) => {
	res.render('authentication/register', { layout: 'layouts/default-layout', title: 'Register', csrfToken: req.session.csrfToken });
});

router.post(
	'/',
	unauthenticatedMiddleware,
	noPendingRegistrationMiddleware,
	csrfProtectionMiddleware,
	validateCredentialsMiddleware,
	registerController
);

module.exports = router;
