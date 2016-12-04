/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/panel", middlewares.isAuthenticated, middlewares.isAdmin, controllers.getPanel)
        .get("/panel/createQuestion", middlewares.isAuthenticated, middlewares.isAdmin, controllers.getCreateQuestionForm)
        .get("/panel/analytics", middlewares.isAuthenticated, controllers.getAllAnalytics)
        .get("/panel/analytics/user/:dataId", middlewares.isAuthenticated, controllers.getAllAnalyticsPerUser);
    app.use("/admin", router);

    return router;
};