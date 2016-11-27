/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {
    let questionController = require("../controllers/question-controller")(data);

    let router = new Router();

    router
        .post("/api/evaluate", questionController.evaluateQuestion);

    app.use("/", router);

    return router;
};