/* globals require, module */

let User = require("mongoose").model("User");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function create(user, callback) {
    User.create(user, callback);
}

function update(userData, callback) {
    User.findById(userData.id)
        .exec((err, user) => {

            if (err) {
                callback(err);
                return;
            }

            if (!user) {
                callback("User cannot be found!");
                return;
            }

            user.email = userData.email;
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.profileImageURL = userData.profileImageURL;

            user.save();

            callback(undefined, "Successfully changed profile data!");
        });
}

module.exports = {
    create,
    update
};