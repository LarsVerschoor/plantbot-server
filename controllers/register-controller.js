const bcrypt = require('bcrypt');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const ACCOUNT_CREATED_MESSAGE = (email) => {
	return `Account successfully created. We have sent an email to ${email} to verify your account.`;
};

const SALT_ROUNDS = parseInt(process.env.BCRYPT_HASH_ROUNDS, 10);
const transporter = nodemailer.createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	}
});

const registerController = async (req, res) => {
	try {
		const { email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const verificationCode = crypto.randomBytes(3).toString('hex');
		const hashedVerificationCode = await bcrypt.hash(verificationCode, SALT_ROUNDS);
		const pendingRegistration = await models.pendingRegistration.create({
			email,
			password: hashedPassword,
			verificationCode: hashedVerificationCode
		});

		req.session.registrationId = pendingRegistration.id;
		await req.session.save();

		const existingUser = await models.User.findOne({
			where: { email }
		});

		let verificationEmail;

		if (existingUser) {
			verificationEmail = {
				from: process.env.EMAIL_ADDRESS,
				to: req.body.email,
				subject: 'You already have a PlantBot account',
				html: `
                    <p>Hello,</p>
                    <p>You just tried to register a new account using this email-address, but you already have an account with this email-address.</p>
                    <p>Did you forget your password for this account? You can change it <a href=http://plantbot.nl/forgot-password>here</a>.</p>
                    <p>If this was not you, you can discard this message.</p>
                    <p>We have not told the person who tried to create this account that the e-mail address is already linked to an account.</p>
                `
			};
		} else {
			verificationEmail = {
				from: process.env.EMAIL_ADDRESS,
				to: pendingRegistration.email,
				subject: 'Verification code for your account',
				html: `
                    <p>Hello,</p>
                    <p>Thank you for creating your PlantBot account!</p>
                    <p>Your verification code is ${verificationCode}. Do not share this code with anyone!</p>
                    <p>If this was not you, you can discard this message.</p>
                `
			};
		}

		await transporter.sendMail(verificationEmail);
		res.status(201).send(ACCOUNT_CREATED_MESSAGE(email));
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = registerController;
