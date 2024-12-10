const csrfProtection = (req, res, next) => {
	const csrfToken = req.get('X-CSRF-Token');
	if (csrfToken !== req.session.csrfToken) {
		return res.status(403).send('CSRF Token mismatch');
	}

	next();
};

module.exports = csrfProtection;
