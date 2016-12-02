/* globals module require */

const express = require("express");

let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");
let analytics = require("../middlewares/analytics");

module.exports = function({ app, controllers }) {
    let router = new Router();

    router
        .get("/test-your-knowledge", analytics, isAuthenticated, controllers.getTestKnowledgeMap)
        .get("/test-your-knowledge/:countryName", isAuthenticated, controllers.getQuestion);

    app.use("/game", router);

    return router;
};
    return router;
};      .put("/profile", isAuthenticated, controllers.updateProfile)
        .put("/users/:username", isAuthenticated, isAdmin, controllers.updateUserRole);

    app.use("/api", router);

    return router;
};