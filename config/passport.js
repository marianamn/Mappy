/* globals module require */

const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function({ app, data }) {
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new LocalStrategy((username, password, done) => {
        data.findUserByCredentials(username)
            .then(user => {
                if (user) {
                    let userSalt = user.salt;
                    let requestHashPass = data.encryption.generateHashedPassword(userSalt, password);

                    if (user.hashPass === requestHashPass) {
                        return done(null, user);
                    }
                }

                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    passport.use(strategy);
    passport.use(new FacebookStrategy({
        clientID: 343650825996679,
        clientSecret: "f1bed70cad9816e1e638f77b316ccc85",
        callbackURL: "http://localhost:3001/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email", "gender", "profileUrl"]
    },
        (accessToken, refreshToken, profile, done) => {
            data.findUserByFacebookId(profile.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        let splitedName = profile.displayName.split(" ");

                        data.createFacebookUser(profile.displayName, splitedName[0], splitedName[1], profile.profileUrl, profile.id)
                            .then((createdUser) => {
                                return done(null, createdUser);
                            });
                    }
                })
                .catch(err => {
                    return done(err, false);
                });
        }
    ));

    passport.serializeUser((user, done) => {
        let id = user.id || user._id;
        if (user) {
            done(null, id);
        }
    });

    passport.deserializeUser((id, done) => {
        data.findUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    });
};