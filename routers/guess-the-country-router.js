/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/guess-the-country", isAuthenticated, controllers.getRandomCountryQuestion)
        .get("/guess-the-country/:requiredCountryName/:selectedCountryName", isAuthenticated, controllers.evaluateGuessTheCountryAnswer);

    app.use("/game", router);

    return router;
};