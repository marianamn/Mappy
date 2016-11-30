/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {
    let rankingController = require("../controllers/rankings-controller")(data);

    let router = new Router();

    router
        .get("/guess-the-country-score", rankingController.guessTheCountryScoreRanking)
        .get("/test-your-knowledg-score", rankingController.testYourKnolegeScoreRanking)
        .get("/", rankingController.totalRanking);

    app.use("/rankings", router);

    return router;
};