const models = require('../models');

const loginController = async (req, res, next) => {
	try {
		console.log('test');
		const { email, password } = req.body;
		const user = await models.User.findOne({
			where: { email }
		});
		console.log(user);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = loginController;
