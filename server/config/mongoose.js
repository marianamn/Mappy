/* globals require, module, console*/

let mongoose = require("mongoose"),
    UserModel = require("../models/User");

module.exports = function(config) {
    mongoose.connect(config.db);
    let db = mongoose.connection;

    db.once("open", (err) => {
        if (err) {
            console.log(`Database could not be opened: ${err}`);
            return;
        }

        console.log("Database up and running...");
    });

    db.on("error", (err) => {
        console.log(`Database error:${err}`);
    });

    UserModel.init();
};