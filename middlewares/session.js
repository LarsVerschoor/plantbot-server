const models = require('../models');
const { v4: uuidv4 } = require('uuid');

const SESSION_EXPIRATION_MS = 7_200_000; // 2 hours

const sessionMiddleware = async (req, res, next) => {
	try {
		if (req.cookies.session_token) {
			const session = await models.Session.findOne({
				where: { sessionToken: req.cookies.session_token }
			});

			if (session) {
				req.session = session;
				return next();
			}
		}

		req.session = (
			await models.Session.create({
				sessionToken: uuidv4(),
				csrfToken: uuidv4(),
				expiresAt: new Date(Date.now() + SESSION_EXPIRATION_MS),
				userId: null
			})
		).dataValues;

		res.cookie('session_token', req.session.sessionToken, {
			httpOnly: true,
			maxAge: SESSION_EXPIRATION_MS, // 2 hours
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production'
		});

		next();
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = sessionMiddleware;
