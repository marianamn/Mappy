/* globals module require */

const express = require("express");
let Router = express.Router;

let isAdmin = require("../middlewares/is-user-admin");
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function ({ app, data }) {
    let adminController = require("../controllers/admin-controller")(data);
    let questionController = require("../controllers/test-knowledge-controller")(data);
    let authController = require("../controllers/authentication-controller")(data);
    let usersController = require("../controllers/users-controller")(data);
    let countriesController = require("../controllers/countries-controller")(data);

    let router = new Router();

    router
        .get("/users", usersController.getAllUsernames)
        .get("/countries", isAuthenticated, isAdmin, countriesController.getAllCountriesNames)
        .post("/register", authController.register)
        .post("/createQuestion", isAuthenticated, isAdmin, adminController.createQuestion)
        .post("/evaluate", isAuthenticated, questionController.evaluateQuestion)
        .post("/users/:username/comments", isAuthenticated, usersController.addComment)
        .put("/profile", isAuthenticated, usersController.updateProfile)
        .put("/users/:username", isAuthenticated, isAdmin, usersController.updateUserRole);

    app.use("/api", router);

    return router;
};