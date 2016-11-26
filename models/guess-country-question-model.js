/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("GuessCountryQuestion", {
    question: {
        type: String,
        required: requiredMessage
    },
    answers: [{
        content: String,
        isCorrect: Boolean
    }]
});