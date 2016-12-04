/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Analytics", {
    userAgent: String,
    arriveTimeStamp: String,
    cameFrom: String,
    pagesBeforeLogin: [{
        type: String
    }],
    userId: String,
    loginTimeStamp: String,
    pagesAfterLogin: [{
        type: String
    }],
    hasRegistered: Boolean,
    registeredTimeStamp: String
});