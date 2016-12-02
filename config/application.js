/* globals module require */

const express = require("express"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    session = require("express-session"),
    // not sure where to inject encryption
    encryption = require("../utils/encryption");

module.exports = function ({ data }) {
    let app = express();

    app.set("view engine", "pug");

    app.use(cookieParser());
    app.use("/static", express.static("public"));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: "top secret" }));

    // not sure about this too
    data.encryption = encryption;

    require("./passport")({ app, data });

    let server = require("http").Server(app);

    return { app, server };
};
