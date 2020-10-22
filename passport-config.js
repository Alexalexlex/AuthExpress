const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const { Users } = require('./models');

module.exports = (passport) => {
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
}
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('aaa')
    console.log(jwt_payload)
    Users.findOne({id: jwt_payload.id}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
};