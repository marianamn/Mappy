/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {
    let homeController = require("../controllers/home-controller")(data);
    let rankingController = require("../controllers/rankings-controller")(data);
    let termsOfUseController = require("../controllers/terms-of-use-controller")(data);
    let countriesController = require("../controllers/countries-controller")(data);

    let router = new Router();

    router
        .get("/", homeController.home)
        .get("/rankings/guess-the-country-score", rankingController.guessTheCountryScoreRanking)
        .get("/rankings/test-your-knowledg-score", rankingController.testYourKnolegeScoreRanking)
        .get("/rankings", rankingController.totalRanking)
        .get("/terms", termsOfUseController.getTerms)
        .get("/countries", countriesController.allCountries)
        .get("/countries/:id", countriesController.countryDetails);

    app.use("/", router);

    return router;
};