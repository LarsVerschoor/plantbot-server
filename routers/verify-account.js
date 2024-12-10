const router = require('express').Router();
const csrfProtectionMiddleware = require('../middlewares/csrf-protection');
const unauthenticatedMiddleware = require('../middlewares/unauthenticated');
const hasPendingRegistrationMiddleware = require('../middlewares/pendingRegistration')(true);
const { viewVerificationController, checkVerificationController } = require('../controllers/verify-account-controller');

router.get('/', unauthenticatedMiddleware, hasPendingRegistrationMiddleware, viewVerificationController);

router.post('/', unauthenticatedMiddleware, hasPendingRegistrationMiddleware, csrfProtectionMiddleware, checkVerificationController);

module.exports = router;
