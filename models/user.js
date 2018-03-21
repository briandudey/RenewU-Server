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

// UserSchema.pre('save', function(next) {
// 	const user = this,
// 		SALT_FACTOR = 10;
// 	if (!user.isModified('password')) return next();

// 	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
// 		if (err) return next(err);

// 		bcrypt.hash(user.password, salt, null, function(err, hash) {
// 			if (err) return next(err);
// 			user.password = hash;
// 			next();
// 		});
// 	});
// });

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('users', UserSchema);
