/* globals require, module, console*/

let passport = require("passport"),
    LocalPassport = require("passport-local"),
    User = require("mongoose").model("User");

module.exports = function() {
    passport.use(new LocalPassport((username, password, done) => {
        User.findOne({ username }).exec((err, user) => {
            if (err) {
                console.log(`Error loading user: ${err}`);
                return;
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
            // return done(null, user.id);
        }
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id }).exec((err, user) => {
            if (err) {
                console.log(`Error loading user: ${err}`);
                return;
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};