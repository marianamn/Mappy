/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function ({ app, controllers, middlewares }) {
    let router = new Router();

    router
        .get("/users", middlewares.isAuthenticated, controllers.getAllUsernames)
        .get("/countries", middlewares.isAuthenticated, middlewares.isAdmin, controllers.getAllCountriesNames)
        .post("/register", middlewares.analytics, controllers.register)
        .post("/createQuestion", middlewares.isAuthenticated, middlewares.isAdmin, controllers.createQuestion)
        .post("/evaluate", middlewares.isAuthenticated, controllers.evaluateQuestion)
        .post("/chat", middlewares.analytics, middlewares.isAuthenticated, controllers.createNewChatAnswer)
        .put("/profile", middlewares.analytics, middlewares.isAuthenticated, controllers.updateProfile)
        .put("/users/:username", middlewares.analytics, middlewares.isAuthenticated, middlewares.isAdmin, controllers.updateUserRole);

    app.use("/api", router);

    return router;
};