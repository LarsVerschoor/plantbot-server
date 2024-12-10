const pendingRegistrationMiddleware = (pending) => {
	return (req, res, next) => {
		if (pending) {
			return req.session.pendingRegistration ? next() : res.redirect('register');
		}
		return req.session.pendingRegistration ? res.redirect('verify-account') : next();
	};
};

module.exports = pendingRegistrationMiddleware;
