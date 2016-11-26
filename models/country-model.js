/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("Country", {
    name: {
        type: String,
        required: requiredMessage,
        unique: true
    },
    flagURL: {
        type: String,
        required: requiredMessage
    },
    countryImgUrl: {
        type: String,
        required: requiredMessage
    },
    capital: {
        type: String,
        required: requiredMessage,
        unique: true
    },
    currency: {
        type: String,
        required: requiredMessage,
        unique: true
    },
    population: {
        type: Number,
        min: 0
    },
    area: {
        type: Number,
        min: 0
    },
    populationDensity: {
        type: Number,
        min: 0
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    countryInformation: {
        type: String,
        required: requiredMessage,
        max: 1000
    }
});