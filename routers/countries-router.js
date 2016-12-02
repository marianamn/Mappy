/* globals module require */

const express = require("express");

let Router = express.Router;
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/", analytics, controllers.allCountries)
        .get("/:id", analytics, controllers.countryDetails);

    app.use("/countries", router);

    return router;
};