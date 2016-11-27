/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, data }) {

    let controller = require("../controllers/guess-the-country-controller")(data);
    let router = new Router();

    router
        .get("/guess-the-country", isAuthenticated, controller.getFindTheCountryQuestion)
        .get("/guess-the-country/:requiredCountryName/:selectedCountryName", isAuthenticated, controller.evaluateGuessTheCountryAnswer);

    app.use("/game", router);

    return router;
};