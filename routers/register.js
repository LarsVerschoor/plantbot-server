const express = require('express');
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const validateCredentialsMiddleware = require('../middlewares/validate-credentials');
const registerController = require('../controllers/register-controller');

const router = express.Router();

router.get('/', unauthenticatedMiddleware, (req, res) => {
	res.render('authentication/register', { layout: 'layouts/default-layout', title: 'Register', csrfToken: req.session.csrfToken });
});

router.post('/', unauthenticatedMiddleware, csrfProtectionMiddleware, validateCredentialsMiddleware, registerController);

module.exports = router;
