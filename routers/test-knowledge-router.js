/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function ({ app, controllers }) {
    let router = new Router();

    router
        .get("/test-your-knowledge", isAuthenticated, controllers.getTestKnowledgeMap)
        .get("/test-your-knowledge/:countryName", isAuthenticated, controllers.getQuestion);

    app.use("/game", router);

    return router;
};