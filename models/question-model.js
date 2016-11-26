/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Question", {
    question: {
        type: String,
        required: requiredMessage,
        min: 3,
        max: 100
    },
    answers: [{
        answer: String,
        isCorrect: Boolean
    }],
    country: {
        type: String,
        required: requiredMessage
    }
});