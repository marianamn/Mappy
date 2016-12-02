/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/register", controllers.getRegisterForm)
        .get("/login", analytics, controllers.getLoginForm)
        .get("/facebook", analytics, passport.authenticate("facebook"))
        .get("/unauthorized", analytics, controllers.unauthorized)
        .get("/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
            (req, res) => {
                res.redirect("/");
            })
        .post("/login", analytics,
            passport.authenticate("local", { failureRedirect: "/auth/login" }),
            (req, res) => {
                res.redirect("/");
            })
        .post("/logout", analytics, isAuthenticated, controllers.logout);

    app.use("/auth", router);

    return router;
};