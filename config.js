module.exports = {
	PORT: process.env.PORT || 8080,
	CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',

	JWT_EXPIRY: '8d',
	JWT_SECRET: process.env.JWT_SECRET || 'popeye',

	mongoURI:
		process.env.DATABASE_URI ||
		'mongodb://BrianDudey:pass123@ds127341.mlab.com:27341/renewu-dev'
};
