/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Analytics", {
    userAgent: {
        type: String
    },
    arriveTime: {
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
    loginTime: {
        type: String
    },
    pagesAfterLogin: [{
        type: String
    }],
    hasRegistered: {
        type: Boolean
    }
});