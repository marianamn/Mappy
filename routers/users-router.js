/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, data }) {

    let controller = require("../controllers/users-controller")(data);
    let router = new Router();

    router
        .get("/:username", isAuthenticated, controller.getUserByUsername);

    app.use("/users", router);

    return router;
};