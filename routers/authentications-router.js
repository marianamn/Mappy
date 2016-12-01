/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/register", controllers.getRegisterForm)
        .get("/login", controllers.getLoginForm)
        .get("/facebook", passport.authenticate("facebook"))
        .get("/unauthorized", controllers.unauthorized)
        .get("/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/login",
        passport.authenticate("local", { failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/logout", isAuthenticated, controllers.logout);

    app.use("/auth", router);

    return router;
};