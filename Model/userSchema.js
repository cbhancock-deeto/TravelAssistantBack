const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: [true, 'required field'] },
	passwordHash: { type: String, required: [true, 'required field'] },
	firstName: { type: String, required: [true, 'required field'] },
	lastName: { type: String, required: [true, 'required field'] },
	email: { type: String, required: [true, 'required field'] },
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
