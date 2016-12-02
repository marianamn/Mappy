/* globals module require */

const express = require("express");
let Router = express.Router;
let visitedPages = require("../middlewares/visited-pages");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/guess-the-country-score", visitedPages, controllers.guessTheCountryScoreRanking)
        .get("/test-your-knowledg-score", visitedPages, controllers.testYourKnolegeScoreRanking)
        .get("/", visitedPages, controllers.totalRanking);

    app.use("/rankings", router);

    return router;
};