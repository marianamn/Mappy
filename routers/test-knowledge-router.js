/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/test-your-knowledge", analytics, isAuthenticated, controllers.getTestKnowledgeMap)
        .get("/test-your-knowledge/:countryName", analytics, isAuthenticated, controllers.getQuestion);

    app.use("/game", router);

    return router;
};