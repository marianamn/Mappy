/* globals require, module*/

let express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    passport = require("passport");

module.exports = (app, config) => {
    app.set("view engine", "pug");
    app.set("views", `${config.rootPath}/server/views`);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: "magic unicorns", resave: true, saveUninitialized: true }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(`${config.rootPath}/public`));

    app.use((req, res, next) => {
        if (req.session.error) {
            let msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        } else {
            app.locals.errorMessage = undefined;
        }

        next();
    });

    app.use((req, res, next) => {
        if (req.user) {
            app.locals.currentUser = req.user;
        } else {
            app.locals.currentUser = undefined;
        }

        next();
    });
};