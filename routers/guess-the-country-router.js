/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/guess-the-country", middlewares.analytics, middlewares.isAuthenticated, controllers.getRandomCountryQuestion)
        .get("/guess-the-country/:requiredCountryName/:selectedCountryEuValue", middlewares.analytics, middlewares.isAuthenticated, controllers.evaluateGuessTheCountryAnswer);

    app.use("/game", router);

    return router;
};