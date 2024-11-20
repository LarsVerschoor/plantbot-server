const bcrypt = require('bcrypt');
const models = require('../models');

const SALT_ROUNDS = 10;

const registerController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const newUser = await models.User.create({
			email,
			password: hashedPassword
		});

		req.session.userId = newUser.id;
		await req.session.save();
		console.log('Host:', req.headers.host);
		res.status(201).send('Successfully Logged In');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = registerController;
