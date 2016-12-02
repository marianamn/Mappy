/* globals module */

const dataUtils = require("./utils/data-utils");
const encrypt = require("../utils/encryption");

function validateUser({ validator, username, firstName, lastName, profileImgURL }) {
    if (!validator.validateStringLength(username, 3, 50)) {
        return Promise.reject("Error: Username must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(username)) {
        return Promise.reject("Username fail");
    }

    if (!validator.validateStringLength(firstName, 3, 50)) {
        return Promise.reject("Error: First name must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(firstName)) {
        return Promise.reject("First name fail");
    }

    if (!validator.validateStringLength(lastName, 3, 50)) {
        return Promise.reject("Error: Last name must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(lastName)) {
        return Promise.reject("Last name fail");
    }

    if (profileImgURL && !validator.validateImageUrl(profileImgURL)) {
        return Promise.reject("Invalid image url");
    }
}

module.exports = function(models, validator) {
    let { User } = models;

    return {
        createUser(username,
            firstName,
            lastName,
            email,
            profileImgURL,
            salt,
            hashPass) {

            validateUser({ validator, username, firstName, lastName, profileImgURL });

            if (!validator.validateEmail(email)) {
                return Promise.reject("Email fail");
            }

            if (!salt) {
                return Promise.reject("Salt must exists");
            }

            if (!hashPass) {
                return Promise.reject("Hash pass must exists");
            }

            let user = new User({
                User,
                username,
                firstName,
                lastName,
                email,
                profileImgURL,
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
        createFacebookUser(username, firstName, lastName, profileImgURL, facebookId) {
            validateUser({ validator, username, firstName, lastName, profileImgURL });

            if (!validator.validateIsStringValid(facebookId)) {
                return Promise.reject("Facebook id fail");
            }

            let user = new User({
                User,
                username,
                firstName,
                lastName,
                profileImgURL,
                facebookId
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
            let id = userData.id;
            let firstName = userData.firstName;
            let lastName = userData.lastName;
            let email = userData.email;
            let profileImgURL = userData.profileImgURL;

            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            }).then(user => {
                user.email = email || user.email;
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.profileImgURL = profileImgURL || user.profileImgURL;

                return dataUtils.update(user);
            });
        },
        updateUserAndPassword(userData) {
            let id = userData.id;
            let firstName = userData.firstName;
            let lastName = userData.lastName;
            let email = userData.email;
            let profileImgURL = userData.profileImgURL;

            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            }).then(user => {
                user.email = email || user.email;
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.profileImageURL = profileImgURL || user.profileImgURL;
                user.hashPass = encrypt.generateHashedPassword(user.salt, userData.password);

                return dataUtils.update(user);
            });
        },
        increaseUserScore(userId, scoreType, increasingValue) {
            return new Promise((resolve, reject) => {
                User.findById(userId, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            }).then(user => {
                user[scoreType] += increasingValue;

                return dataUtils.update(user);
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                User.findById(id, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByFacebookId(facebookId) {
            return new Promise((resolve, reject) => {
                User.findOne({ facebookId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find({}, (err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
        },
        getAllUsernames() {
            return new Promise((resolve, reject) => {
                User.find({}, "username", (err, usernames) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(usernames);
                });
            });
        },
        // If chat is not implemented validate method
        addComment(usernameToAdd, commentContent, author) {
            let comment = {
                content: commentContent,
                author
            };

            return new
            Promise((resolve, reject) => {
                    User.findOne({ username: usernameToAdd }, (err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
                })
                .then((user) => {
                    user.comments.push(comment);
                    return dataUtils.save(user);
                });
        },
        updateUserRole(username, isAdmin) {
            return new
            Promise((resolve, reject) => {
                    User.findOne({ username }, (err, user) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(user);
                    });
                })
                .then(user => {
                    if (!user) {
                        throw new Error("User not found");
                    }

                    user.isAdmin = isAdmin;
                    return dataUtils.save(user);
                });
        }
    };
};