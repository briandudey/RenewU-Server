const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const keys = require('./keys');
const passport = require('passport');

//Setting up JWT login strategy
const { JWT_EXPIRY, JWT_SECRET } = require('./keys');

const options = {
	secretOrKey: keys.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
	algorithms: ['HS256']
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
	done(null, payload.user);
});

//JWT End
passport.use(jwtStrategy);
module.exports = jwtStrategy;
