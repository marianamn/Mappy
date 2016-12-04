/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/guess-the-country-score", middlewares.analytics, controllers.guessTheCountryScoreRanking)
        .get("/test-your-knowledg-score", middlewares.analytics, controllers.testYourKnolegeScoreRanking)
        .get("/", middlewares.analytics, controllers.totalRanking);

    app.use("/rankings", router);

    return router;
};