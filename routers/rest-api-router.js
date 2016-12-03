/* globals module require */

const express = require("express");
let Router = express.Router;

let isAdmin = require("../middlewares/is-user-admin");
let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/users", controllers.getAllUsernames)
        .get("/countries", isAuthenticated, isAdmin, controllers.getAllCountriesNames)
        .post("/register", analytics, controllers.register)
        .post("/createQuestion", isAuthenticated, isAdmin, controllers.createQuestion)
        .post("/evaluate", isAuthenticated, controllers.evaluateQuestion)
        .post("/chat", analytics, isAuthenticated, controllers.createNewChatAnswer)
        .put("/profile", analytics, isAuthenticated, controllers.updateProfile)
        .put("/users/:username", analytics, isAuthenticated, isAdmin, controllers.updateUserRole);

    app.use("/api", router);

    return router;
};