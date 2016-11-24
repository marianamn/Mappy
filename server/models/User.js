/* globals require, module */
const mongoose = require("mongoose"),
    encryption = require("../utilities/encryption");

let requiredMessage = "{PATH} is required",
    defaultAvatar = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROlGRdktKqjAEM9czQSiNjcH9bi_QHI21-nZKaa6mw_4dgbvoR";

module.exports.init = function() {
    let userSchema = new mongoose.Schema({
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
        profileImageURL: {
            type: String,
            default: defaultAvatar
        }
    });

    function authenticate(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }

    userSchema.method({
        authenticate
    });

    let User = mongoose.model("User", userSchema);

    User.find({}).exec((err) => {
        if (err) {
            console.log(`Cannot find users: ${err}`);
        }
    });
};