const express = require('express');
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const validateLoginMiddleware = require('../middlewares/validate-login');
const loginController = require('../controllers/login-controller');

const router = express.Router();

router.get('/', unauthenticatedMiddleware, (req, res) => {
	res.render('authentication/login', { layout: 'layouts/default-layout', title: 'Login', csrfToken: req.session.csrfToken });
});

router.post('/', unauthenticatedMiddleware, csrfProtectionMiddleware, validateLoginMiddleware, loginController);

module.exports = router;
