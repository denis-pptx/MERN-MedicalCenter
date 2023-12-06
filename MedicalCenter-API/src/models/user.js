const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	login: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
		trim: true,
		minlength: [3, 'Username must be at least 3 characters long'],
		maxlength: [30, 'Username cannot exceed 30 characters'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		trim: true,
		match: [/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, 'Please enter a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	}
});

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		try {
			this.password = await bcrypt.hash(this.password, 10);
		} catch (error) {
			return next(error);
		}
	}
	next();
});

module.exports = mongoose.model('User', userSchema);
