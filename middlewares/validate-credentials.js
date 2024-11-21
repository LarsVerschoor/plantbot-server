const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Invalid = require('../utils/Invalid');

const validateCredentialsMiddleware = async (req, res, next) => {
	try {
		const errors = [];

		if (req.body.email) req.body.email = req.body.email.trim();
		const { email, password } = req.body;

		if (!email) errors.push(new Invalid('email', 'Email-address is required'));
		else if (!EMAIL_REGEX.test(email)) errors.push(new Invalid('email', 'Email-address is invalid'));

		if (!password) errors.push(new Invalid('password', 'Password is required'));
		else if (password.length < 8 || password.length > 255) errors.push(new Invalid('password', 'Password must be between 8 and 255 characters'));

		if (errors.length > 0) return res.status(400).json({ errors });

		next();
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = validateCredentialsMiddleware;
