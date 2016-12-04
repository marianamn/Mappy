/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/", middlewares.analytics, controllers.home)
        .get("/terms", middlewares.analytics, (req, res) => {
            res.render("terms-of-use/terms-of-use", {
                user: req.user
            });
        });

    app.use("/", router);

    return router;
};