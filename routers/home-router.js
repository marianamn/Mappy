/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, data }) {
    let controller = require("../controllers/home-controller")(data);

    let router = new Router();

    router
        .get("/", controller.home)
        .get("/terms", (req, res) => {
            res.render("terms-of-use/terms-of-use");
        });

    app.use("/", router);

    return router;
};