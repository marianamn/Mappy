/* globals module require */

const express = require("express"),
    passport = require("passport");

let Router = express.Router;

module.exports = function ({ app }) {
    let router = new Router();

    router
        .get("/auth/facebook/callback", passport.authenticate("facebook", { scope: "email", failureRedirect: "/auth/login" }),
        (req, res) => {
            res.redirect("/");
        });

    app.use("/production", router);

    return router;
};