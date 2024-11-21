const bcrypt = require('bcrypt');
const models = require('../models');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const SALT_ROUNDS = 10;

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
		const newUser = await models.User.create({
			email,
			password: hashedPassword,
			uuid: uuidv4()
		});

		const verificationEmail = {
			from: process.env.EMAIL_ADDRESS,
			to: newUser.email,
			subject: 'Verify your PlantBot account',
			html: `
                <p>Hello,</p>
                <p>Thank you for creating your PlantBot account!</p>
                <p>If this was you, you can verify your account <a href=http://plantbot.nl/verify-account/${newUser.uuid}>here</a>.</p>
                <p>If this was NOT you, please delete your account using <a href=http://plantbot.nl/delete-account/${newUser.uuid}>this</a> link.</p>
            `
		};

		await transporter.sendMail(verificationEmail);
		res.status(201).send('Account successfully created. We have sent you an email to verify your account.');
	} catch (error) {
		try {
			if (error.name === 'SequelizeUniqueConstraintError') {
				const verificationEmail = {
					from: process.env.EMAIL_ADDRESS,
					to: req.body.email,
					subject: 'You already have a PlantBot account',
					html: `
                        <p>Hello,</p>
                        <p>You just tried to register a new account using this email-address, but you already have an account with this email-address.</p>
                        <p>Did you forget your password for this account? You can change it <a href=http://plantbot.nl/forgot-password>here</a>.</p>
                        <p>If this was not you, you can discard this message.</p>
                        <p>For security reasons, we have not told the person who tried to register using this email-address that the email-address already belongs to an account.</p>
                    `
				};
				await transporter.sendMail(verificationEmail);
				res.status(201).send('Account successfully created. We have sent you an email to verify your account.');
			} else {
				console.error(error);
				res.status(500).send('Internal Server Error');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Internal Server Error');
		}
	}
};

module.exports = registerController;
