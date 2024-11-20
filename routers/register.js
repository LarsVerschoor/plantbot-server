const express = require('express');
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const validateRegisterMiddleware = require('../middlewares/validate-register');
const registerController = require('../controllers/register-controller');

const router = express.Router();

router.get('/', unauthenticatedMiddleware, (req, res) => {
	res.render('authentication/register', { layout: 'layouts/default-layout', title: 'Register', csrfToken: req.session.csrfToken });
});

router.post('/', unauthenticatedMiddleware, csrfProtectionMiddleware, validateRegisterMiddleware, registerController);

module.exports = router;
