/* globals module require */

const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy,
    config = require("./index");

module.exports = function({ app, data }) {
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new LocalStrategy((username, password, done) => {
        data.getUserByCredentials(username)
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
// ""
    passport.use(strategy);
    passport.use(new FacebookStrategy({
        clientID: 247519755665819,
        clientSecret: "c5b84993eb1197cb4e753a6d0d7a4624",
        callbackURL: `${config.rootUrl}/production/auth/facebook/callback`,
        profileFields: ["id", "displayName", "picture.type(large)", "email", "gender", "profileUrl"]
    },
        (accessToken, refreshToken, profile, done) => {
            data.getUserByFacebookId(profile.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        let splitedName = profile.displayName.split(" ");

                        data.createFacebookUser(profile.displayName, splitedName[0], splitedName[1], profile.photos[0].value, profile.id)
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
        data.getUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    });
};