/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, middlewares }) {

    let router = new Router();

    router
        .get("/", middlewares.analytics, (req, res) => {
            let username = req.query.username;
            let redirectUrl = `/users/${username}`;
            res.redirect(redirectUrl);
        });

    app.use("/search", router);

    return router;
};