const UserModel = require('../Model/userSchema');

exports.createUser = async (req, res) => {
	try {
		let newUser = await UserModel.create({
			username: req.body.username,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			passwordHash: req.body.password,
		});

		res.status(201).json({
			status: 'success',
			data: {
				newUser,
			},
		});
	} catch (err) {
		return res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getUser = async (req, res) => {
	const user = await UserModel.findOne({ username: req.body.username });
	if (user.length === 0) {
		res.status(400).send('Cannot find user');
		return;
	}
	try {
		res.status(200).json({
			status: 'success',
			message: `${user.username} successful`,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
