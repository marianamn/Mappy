/* globals module */

const dataUtils = require("./utils/data-utils");

module.exports = function (models) {
    let { User } = models;

    return {
        createUser(username,
            firstName,
            lastName,
            email,
            profileImageURL,
            salt,
            hashPass) {
            let user = new User({
                User,
                username,
                firstName,
                lastName,
                email,
                profileImageURL,
                salt,
                hashPass
            });
            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        updateUser(userData) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userData.id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            }).then(user => {
                user.email = userData.email || user.email;
                user.firstName = userData.firstName || user.email;
                user.lastName = userData.lastName || user.email;
                user.profileImageURL = userData.profileImageURL || user.email;

                return dataUtils.update(user);
            });

        }
    };
};