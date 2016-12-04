/* globals module require */

let isAdmin = require("./is-user-admin");
let isAuthenticated = require("./is-user-authenticated");
let analytics = require("./analytics");

module.exports = {
    isAdmin,
    isAuthenticated,
    analytics
};