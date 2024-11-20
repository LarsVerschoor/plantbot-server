const csrfProtection = (req, res, next) => {
	const csrfToken = req.get('X-CSRF-Token');
	console.log(csrfToken);
	console.log(req.session.csrfToken);
	if (csrfToken !== req.session.csrfToken) {
		return res.status(403).send('CSRF Token mismatch');
	}

	next();
};

module.exports = csrfProtection;
