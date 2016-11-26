/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

let requiredMessage = "{PATH} is required",
    defaultAvatar = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROlGRdktKqjAEM9czQSiNjcH9bi_QHI21-nZKaa6mw_4dgbvoR";

module.exports = modelRegistrator.register("User", {
    username: {
        type: String,
        required: requiredMessage,
        unique: true
    },
    salt: String,
    hashPass: String,
    firstName: {
        type: String,
        required: requiredMessage
    },
    lastName: {
        type: String,
        required: requiredMessage
    },
    email: {
        type: String,
        required: requiredMessage
    },
    profileImgURL: {
        type: String,
        default: defaultAvatar
    },
    score: {
        type: Number,
        default: 0
    }
});