const models = require('../models');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

class Invalid {
	constructor(field, message) {
		this.field = field;
		this.message = message;
	}
}

const validateRegisterMiddleware = async (req, res, next) => {
	try {
		const errors = [];

		// trim email
		if (req.body.email) req.body.email = req.body.email.trim();

		const { email, password } = req.body;

		// validate email
		if (!email) errors.push(new Invalid('email', 'Email-address is required'));
		else if (!EMAIL_REGEX.test(email)) errors.push(new Invalid('email', 'Email-address is invalid'));
		else {
			const user = await models.User.findOne({
				where: { email }
			});

			if (user) errors.push(new Invalid('email', 'Email-address is already registered'));
		}

		// validate password
		if (!password) errors.push(new Invalid('password', 'Password is required'));
		else if (password.length < 8 || password.length > 255) errors.push(new Invalid('password', 'Password must be between 8 and 255 characters'));

		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = validateRegisterMiddleware;
