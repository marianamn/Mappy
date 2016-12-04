/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/test-your-knowledge", middlewares.analytics, middlewares.isAuthenticated, controllers.getTestKnowledgeMap)
        .get("/test-your-knowledge/:countryName", middlewares.analytics, middlewares.isAuthenticated, controllers.getQuestion);

    app.use("/game", router);

    return router;
};