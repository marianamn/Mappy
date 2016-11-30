/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {
    let countriesController = require("../controllers/countries-controller")(data);

    let router = new Router();

    router
        .get("/", countriesController.allCountries)
        .get("/:id", countriesController.countryDetails);

    app.use("/countries", router);

    return router;
};