const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('./models');

module.exports = (passport) => {
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({where: { id: jwt_payload.id, }})
    .then(user => {
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
    .catch(() => done(err, false))
}));
};