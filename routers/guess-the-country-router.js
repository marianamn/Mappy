/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/guess-the-country", analytics, isAuthenticated, controllers.getRandomCountryQuestion)
        .get("/guess-the-country/:requiredCountryName/:selectedCountryEuValue", analytics, isAuthenticated, controllers.evaluateGuessTheCountryAnswer);

    app.use("/game", router);

    return router;
};