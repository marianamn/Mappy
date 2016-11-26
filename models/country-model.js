/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Country", {
    name: {
        type: String,
        required: requiredMessage
    },
    flagURL: {
        type: String,
        required: requiredMessage
    },
    countryURL: {
        type: String,
        required: requiredMessage
    },
    capital: {
        type: String,
        required: requiredMessage
    },
    currency: {
        type: String,
        required: requiredMessage
    },
    population: {
        type: Number
    },
    area: {
        type: Number
    },
    populationDensity: {
        type: Number
    },
    latitudea: {
        type: Number
    },
    longitude: {
        type: Number
    },
    countryInformation: {
        type: String,
        required: requiredMessage
    }
});