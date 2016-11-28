/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, data }) {
    let controller = require("../controllers/search-controller")(data);

    let router = new Router();

    router
        .get("/", (req, res) => {
            let username = req.query.username;
            let redirectUrl = "/users/" + username;
            res.redirect(redirectUrl);
        });

    app.use("/search", router);

    return router;
};