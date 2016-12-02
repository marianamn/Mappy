/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Analytics", {
    userAgent: {
        type: String
    },
    arriveTimeStamp: {
        type: String
    },
    cameFrom: {
        type: String
    },
    pagesBeforeLogin: [{
        type: String
    }],
    userId: {
        type: String
    },
    loginTimeStamp: {
        type: String
    },
    pagesAfterLogin: [{
        type: String
    }],
    hasRegistered: {
        type: Boolean
    },
    registeredTimeStamp: {
        type: String
    }
});