/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

module.exports = function ({ app, data }) {
    let controller = require("../controllers/authentication-controller")(data);

    let router = new Router();

    router
        .get("/register", controller.getRegisterForm)
        .get("/login", controller.getLoginForm)
        .get("/facebook", passport.authenticate("facebook"))
        .get("/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/login",
        passport.authenticate("local", { failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/logout", controller.logout)
        .get("/unauthorized", controller.unauthorized)
        .get("/profile", controller.getProfile);

    app.use("/auth", router);

    return router;
};