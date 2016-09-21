var passport = require('passport');

exports.isAuthenticated = passport.authenticate('basic', { session: false })
