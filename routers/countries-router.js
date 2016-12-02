/* globals module require */

const express = require("express");
let Router = express.Router;
let analytics = require("../middlewares/visited-pages");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/", analytics, controllers.allCountries)
        .get("/:id", analytics, controllers.countryDetails);

    app.use("/countries", router);

    return router;
};