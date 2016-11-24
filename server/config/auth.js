/* globals require, module */

let passport = require("passport");

function login(req, res, next) {
    let auth = passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            req.session.error = "Invalid Username or Password!";
            res.redirect("/login");
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            res.redirect("/");
        });
    });

    auth(req, res, next);
}

function logout(req, res) {
    req.logout();
    res.redirect("/");
}

function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    } else {
        return next();
    }
}

module.exports = {
    login,
    logout,
    isAuthenticated
};