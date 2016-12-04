/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required";

module.exports = modelRegistrator.register("MoreGames", {
    name: {
        type: String,
        required: requiredMessage,
        min: 3,
        max: 100
    },
    gameUrl: {
        type: String
    },
    gameImgUrl: {
        type: String
    }
});