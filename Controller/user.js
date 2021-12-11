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
