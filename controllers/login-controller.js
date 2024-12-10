const models = require('../models');
const bcrypt = require('bcrypt');
const Invalid = require('../utils/Invalid');

// Dummy hash to compare the password to when the email does not exist in the database. To prevent timing attacks.
const DUMMY_HASH = bcrypt.hashSync('dummyPassword', parseInt(process.env.BCRYPT_HASH_ROUNDS, 10));
const INVALID_CREDENTIALS_ERROR = new Invalid('general', 'The submitted username or password is incorrect.');

const loginController = async (req, res) => {
	try {
		const errors = [];
		const { email, password } = req.body;
		const user = await models.User.findOne({
			where: { email }
		});

		if (!user) {
			await bcrypt.compare(password, DUMMY_HASH);
			errors.push(INVALID_CREDENTIALS_ERROR);
			return res.status(401).json({ errors });
		}

		const passwordCorrect = await bcrypt.compare(password, user.password);
		if (!passwordCorrect) {
			errors.push(INVALID_CREDENTIALS_ERROR);
			return res.status(401).json({ errors });
		}

		req.session.userId = user.id;
		await req.session.save();
		return res.status(200).send('Successfully logged in.');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = loginController;
