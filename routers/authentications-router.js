/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

module.exports = function ({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/register", controllers.getRegisterForm)
        .get("/login", middlewares.analytics, controllers.getLoginForm)
        .get("/facebook", middlewares.analytics, passport.authenticate("facebook"))
        .get("/unauthorized", middlewares.analytics, controllers.unauthorized)
        .get("/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/login", middlewares.analytics, controllers.login)
        .post("/logout", middlewares.analytics, middlewares.isAuthenticated, controllers.logout);

    app.use("/auth", router);

    return router;
};