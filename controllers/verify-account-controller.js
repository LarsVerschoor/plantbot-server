const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const Invalid = require('../utils/Invalid');
const MISSING_VERIFICATION_CODE_ERROR = new Invalid('verification', 'Please enter your code.');
const INVALID_VERIFICATION_CODE_ERROR = new Invalid('verification', 'The submitted code is incorrect.');
const bcrypt = require('bcrypt');

const checkVerificationController = async (req, res) => {
	const transaction = await models.sequelize.transaction();
	try {
		const { verification: verificationCode } = req.body;
		const { pendingRegistration } = req.session;

		if (!verificationCode) {
			await transaction.rollback();
			return res.status(400).json({ errors: [MISSING_VERIFICATION_CODE_ERROR] });
		}

		if (!(await bcrypt.compare(verificationCode, pendingRegistration.verificationCode))) {
			await transaction.rollback();
			return res.status(401).json({ errors: [INVALID_VERIFICATION_CODE_ERROR] });
		}

		const user = await models.User.create(
			{
				password: pendingRegistration.password,
				email: pendingRegistration.email,
				uuid: uuidv4()
			},
			{ transaction }
		);

		await req.session.pendingRegistration.destroy({ transaction });

		req.session.pendingRegistration = null;
		req.session.userId = user.id;
		await req.session.save({ transaction });

		await transaction.commit();
		res.status(200).send('Account successfully verified.');
	} catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			await transaction.rollback();
			return res.status(401).json({ errors: [INVALID_VERIFICATION_CODE_ERROR] });
		}
		transaction.rollback();
		console.error(error);
		return res.status(500).send('Internal Server Error');
	}
};

const viewVerificationController = async (req, res) => {
	const email = req.session.pendingRegistration ? req.session.pendingRegistration.email : 'no-one';
	res.render('authentication/verify-account', {
		layout: 'layouts/default-layout',
		title: 'Verify account',
		email: email ?? 'no one',
		csrfToken: req.session.csrfToken
	});
};

module.exports = { checkVerificationController, viewVerificationController };
