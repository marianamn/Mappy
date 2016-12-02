/* globals module require */

const express = require("express");
let Router = express.Router;

let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/chat", analytics, isAuthenticated, controllers.getChat);

    app.use("/communication", router);

    return router;
};