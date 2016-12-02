/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Chat", {
    user: {
        type: String,
        required: requiredMessage
    },
    answer: {
        type: String,
        required: requiredMessage
    },
    datetime: {
        type: String,
        required: requiredMessage
    }
});