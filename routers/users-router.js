/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/:username", middlewares.analytics, middlewares.isAuthenticated, controllers.getUserProfile)
        .get("/analytics/:userId", middlewares.isAuthenticated, controllers.getUserByUserId);

    app.use("/users", router);

    return router;
};