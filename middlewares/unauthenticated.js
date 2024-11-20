const unauthenticated = (req, res, next) => {
	if (req.session.userId !== null) {
		res.redirect('/');
		return;
	}
	next();
};

module.exports = unauthenticated;
