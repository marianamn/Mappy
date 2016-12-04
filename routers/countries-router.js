/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/", middlewares.analytics, controllers.allCountries)
        .get("/:id", middlewares.analytics, controllers.countryDetails);

    app.use("/countries", router);

    return router;
};