/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/guess-the-country-score", controllers.guessTheCountryScoreRanking)
        .get("/test-your-knowledg-score", controllers.testYourKnolegeScoreRanking)
        .get("/", controllers.totalRanking);

    app.use("/rankings", router);

    return router;
};