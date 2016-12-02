/* globals module require */

const express = require("express");
let Router = express.Router;

let isAdmin = require("../middlewares/is-user-admin");
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, controllers }) {

    let router = new Router();

    router
        .get("/panel", isAuthenticated, isAdmin, controllers.getPanel)
        .get("/panel/createQuestion", isAuthenticated, isAdmin, controllers.getCreateQuestionForm)
        .get("/panel/analytics", isAuthenticated, controllers.getAllAnalytics)
        .get("/panel/analytics/user/:dataId", isAuthenticated, controllers.getAllAnalyticsPerUser);
    app.use("/admin", router);

    return router;
};