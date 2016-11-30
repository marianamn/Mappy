/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, data }) {
    let controller = require("../controllers/authentication-controller")(data);

    let router = new Router();

    router
        .get("/register", controller.getRegisterForm)
        .get("/login", controller.getLoginForm)
        .get("/facebook", passport.authenticate("facebook"))
        .get("/unauthorized", controller.unauthorized)
        .get("/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/login",
        passport.authenticate("local", { failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        })
        .post("/logout", isAuthenticated, controller.logout);

    app.use("/auth", router);

    return router;
};