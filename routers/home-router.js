/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, controllers }) {
    let router = new Router();

    router
        .get("/", controllers.home)
        .get("/terms", (req, res) => {
            res.render("terms-of-use/terms-of-use");
        });

    app.use("/", router);

    return router;
};