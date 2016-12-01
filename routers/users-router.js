/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/:username", isAuthenticated, controllers.getUserProfile);

    app.use("/users", router);

    return router;
};