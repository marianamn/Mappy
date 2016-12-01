/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/", controllers.allCountries)
        .get("/:id", controllers.countryDetails);

    app.use("/countries", router);

    return router;
};