/* globals module require */

const express = require("express");
let Router = express.Router;

let isAdmin = require("../middlewares/is-user-admin");
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function({ app, data }) {
    let adminController = require("../controllers/admin-controller")(data);
    let questionController = require("../controllers/test-knowledge-controller")(data);
    let authController = require("../controllers/authentication-controller")(data);
    let usersController = require("../controllers/users-controller")(data);

    let router = new Router();

    router
        .post("/register", authController.register)
        .post("/createQuestion", adminController.createQuestion)
        .post("/evaluate", questionController.evaluateQuestion)
        .put("/profile", authController.updateProfile)
        .post("/users/:username/comments", usersController.addComment)
        .put("/users/:username", isAuthenticated, isAdmin, usersController.updateUserRole)
        .get("/users", usersController.returnAllUsernames);

    app.use("/api", router);

    return router;
};