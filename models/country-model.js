/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Country", {
    name: {
        type: String,
        required: requiredMessage
    },
    flag: {
        type: String,
        required: requiredMessage
    }
});