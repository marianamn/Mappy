/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/chat", middlewares.analytics, middlewares.isAuthenticated, controllers.getChat);

    app.use("/communication", router);

    return router;
};