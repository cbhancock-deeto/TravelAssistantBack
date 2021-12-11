exports.validateUsername = (user) => {
	let validUser = true;
	if (user.length <= 3) {
		validUser = false;
	}
	return validUser;
};

exports.validateEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.validatePassword = (password) => {
	if (password.length > 0) {
		return true;
	}
	return false;
};
