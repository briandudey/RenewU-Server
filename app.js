const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, CLIENT_ORIGIN } = require('./config');
const router = require('./routes/google');
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const usersRouter = require('./routes/localuser');
const jwtRouter = require('./routes/jwt');
const googleRouter = require('./routes/google');

// app.put('/api/watch', (req, res) => {
// 	let userWatchIndex;
// 	if (req.body.userIndex) {
// 		userIndex++;
// 	}
// 	console.log(userIndex);
// });
//Load User Model
require('./models/user');

//Passport Config
require('./passport/google')(passport);

//load routes
const index = require('./routes/index');
const google = require('./routes/google');
const jwt = require('./routes/jwt');
const localUser = require('./routes/localuser');
//Load keys
const config = require('./config');

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);
//Mandatory Cors
app.use(cors());
// origin: CLIENT_ORIGIN

app.use(cookieParser());
app.use(
	session({
		secret: 'secret',
		resave: false,
		saveUninitialized: false
	})
);

//Passport Local
passport.use(localStrategy);
passport.use(jwtStrategy);

//Passport Middleware Google
app.use(passport.initialize());
app.use(passport.session());

//Set global vars
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mount router on /api
//Local
app.use('/api/auth', jwt);
app.use('/api/auth/register', localUser);
//Google
app.use('/auth', google);
app.use('/', index);

mongoose
	.connect(config.mongoURI)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	// dbConnect();
	runServer();
}
// router(app);
module.exports = { app };
