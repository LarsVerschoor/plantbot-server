const models = require('../models');

const verifyAccountController = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: { uuid: req.params.uuid }
		});

		user.emailVerified = true;
		await user.save();

		req.session.userId = user.id;
		await req.session.save();

		res.status(200).send('Account successfully verified.');
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
};

module.exports = verifyAccountController;
