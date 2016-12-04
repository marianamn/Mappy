/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/", middlewares.analytics, controllers.allGames);

    app.use("/more-games", router);

    return router;
};