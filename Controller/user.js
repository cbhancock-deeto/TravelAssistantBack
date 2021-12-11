const UserModel = require('../Model/userSchema');
const validators = require('../Utilities/validator');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
	//validate password
	if (!validators.validatePassword(req.body.password)) {
		res.status(400).json({
			status: 'fail',
			message: 'password too short.',
		});
	}

	//validate email
	if (!validators.validateEmail(req.body.email)) {
		res.status(400).json({
			status: 'fail',
			message: 'Email is invalid.',
		});
	}

	//validate username
	if (!validators.validateUsername(req.body.username)) {
		res.status(400).json({
			status: 'fail',
			message: 'Username is too short.',
		});
	}

	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		let newUser = await UserModel.create({
			username: req.body.username,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			passwordHash: hashedPassword,
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

// FOR TESTING PURPOSES ONLY
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

exports.userLogin = async (req, res) => {
	const user = await UserModel.findOne({ username: req.body.username });

	if (user.length === 0) {
		res.status(400).send('Cannot find user');
		return;
	}

	try {
		const passCheck = bcrypt.compareSync(req.body.password, user.passwordHash);
		if (passCheck) {
			res.status(200).json({
				status: 'success',
				message: `${user.username} successful login`,
			});
		} else {
			res.status(404).json({
				status: 'fail',
				message: 'Incorrect password',
			});
		}
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};
