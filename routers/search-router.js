/* globals module require */

const express = require("express");
let Router = express.Router;
let analytics = require("../middlewares/visited-pages");

module.exports = function({ app }) {

    let router = new Router();

    router
        .get("/", analytics, (req, res) => {
            let username = req.query.username;
            let redirectUrl = `/users/${username}`;
            res.redirect(redirectUrl);
        });

    app.use("/search", router);

    return router;
};