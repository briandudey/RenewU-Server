const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//Create Schema
const UserSchema = new Schema(
	{
		googleID: {
			type: String
		},
		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true
		},
		username: {
			type: String
		},
		password: {
			type: String
		},
		firstName: {
			type: String
		},
		lastName: {
			type: String
		},
		image: {
			type: String
		},
		userWatchID: {
			type: Number,
			default: 0
		},
		role: {
			type: String,
			enum: ['Member', 'Client', 'Owner'],
			default: 'Member'
		},
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date }
	},
	{
		timestamps: true
	}
);

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('users', UserSchema);
