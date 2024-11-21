const express = require('express');
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const validateCredentialsMiddleware = require('../middlewares/validate-credentials');
const loginController = require('../controllers/login-controller');

const router = express.Router();

router.get('/', unauthenticatedMiddleware, (req, res) => {
	res.render('authentication/login', { layout: 'layouts/default-layout', title: 'Login', csrfToken: req.session.csrfToken });
});

router.post('/', unauthenticatedMiddleware, csrfProtectionMiddleware, validateCredentialsMiddleware, loginController);

module.exports = router;
