/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/:username", analytics, isAuthenticated, controllers.getUserProfile)
        .get("/analytics/:userId", isAuthenticated, controllers.getUserByUserId);

    app.use("/users", router);

    return router;
};