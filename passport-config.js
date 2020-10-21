const { authenticate } = require('passport');

const LocalStrategy = require('passport-local').Strategy
const Users = require('./models').Users


passport.use(new LocalStrategy({usernameField: 'email'},
    function(email, password, done) {
      Users.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

module.exports = authenticate