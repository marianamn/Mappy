/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("FacebookUser", {
    facebookId: {
        type: String,
        unique: true
    }
});