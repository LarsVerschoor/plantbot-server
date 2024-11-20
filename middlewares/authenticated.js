const authenticated = (req, res, next) => {
	if (req.session.userId === null) {
		res.redirect('/login');
		return;
	}
	next();
};

module.exports = authenticated;
