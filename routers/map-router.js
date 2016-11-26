/* globals module require */

const express = require("express");
let Router = express.Router;
let isAuthenticated = require("../middlewares/is-user-authenticated");

module.exports = function ({ app, data }) {
    let controller = require("../controllers/home-controller")(data);

    let router = new Router();

    router
        .get("/map", isAuthenticated, (req, res)=>{
            res.render("map/map");
        });

    app.use("/", router);

    return router;
};