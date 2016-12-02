/* globals module require */

const express = require("express");
let Router = express.Router;
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/guess-the-country-score", analytics, controllers.guessTheCountryScoreRanking)
        .get("/test-your-knowledg-score", analytics, controllers.testYourKnolegeScoreRanking)
        .get("/", analytics, controllers.totalRanking);

    app.use("/rankings", router);

    return router;
};