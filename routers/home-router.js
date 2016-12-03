/* globals module require */

const express = require("express");
let Router = express.Router;
let visitedPages = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/", visitedPages, controllers.home)
        .get("/terms", visitedPages, (req, res) => {
            res.render("terms-of-use/terms-of-use", {
                user: req.user
            });
        });

    app.use("/", router);

    return router;
};