/* globals module require */

const express = require("express");
let Router = express.Router;

let isAdmin = require("../middlewares/is-user-admin");
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function ({ app, data }) {
    let controller = require("../controllers/admin-controller")(data);

    let router = new Router();

    router
        .get("/panel", isAuthenticated, isAdmin, controller.getPanel)
        .get("/panel/createQuestion", isAuthenticated, isAdmin, controller.getCreateQuestionForm);

    app.use("/admin", router);

    return router;
};