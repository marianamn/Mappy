/* globals module require */

const express = require("express");

let Router = express.Router;

module.exports = function({ app, data }) {

    let controller = require("../controllers/game-controller")(data);
    let router = new Router();

    router
        .get("/find-the-country", controller.getFindTheCountryQuestion)
        .get("/test-your-knowledge", controller.getTestKnowledgeQuestion);

    app.use("/game", router);

    return router;
};