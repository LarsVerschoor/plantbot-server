const logoutController = async (req, res) => {
	try {
		await req.session.destroy();
		res.status(204).send('Successfully logged out of your account');
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = logoutController;
