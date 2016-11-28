/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, data }) {
    let controller = require("../controllers/admin-controller")(data);

    let router = new Router();

    router
        .get("/panel", controller.getPanel)
        .get("/panel/createQuestion", controller.getCreateQuestion);

    app.use("/admin", router);

    return router;
};