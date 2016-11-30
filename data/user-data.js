/* globals module */

const dataUtils = require("./utils/data-utils");
const encrypt = require("../utils/encryption");

module.exports = function (models) {
    let { User } = models;

    return {
        createUser(username,
            firstName,
            lastName,
            email,
            profileImgURL,
            salt,
            hashPass) {
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
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userData.id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            }).then(user => {
                user.email = userData.email || user.email;
                user.firstName = userData.firstName || user.firstName;
                user.lastName = userData.lastName || user.lastName;
                user.profileImgURL = userData.profileImgURL || user.profileImgURL;

                return dataUtils.update(user);
            });
        },
        updateUserAndPassword(userData) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userData.id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            }).then(user => {
                user.email = userData.email || user.email;
                user.firstName = userData.firstName || user.firstName;
                user.lastName = userData.lastName || user.lastName;
                user.profileImageURL = userData.profileImgURL || user.profileImgURL;
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
                    user.isAdmin = isAdmin;
                    return dataUtils.save(user);
                });
        }
    };
};