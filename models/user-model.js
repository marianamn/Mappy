/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("User", {
    username: {
        type: String,
        unique: true
    },
    salt: String,
    hashPass: String,
    firstName: {
        type: String,
        required: requiredMessage
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    profileImgURL: {
        type: String
    },
    guessTheCountryScore: {
        type: Number,
        default: 0
    },
    testYourKnowledgeScore: {
        type: Number,
        default: 0
    },
    isAdmin: Boolean,
    comments: [{
        content: {
            type: String,
            required: requiredMessage
        },
        author: {
            type: String,
            required: requiredMessage
        }
    }],
    facebookId: String
});