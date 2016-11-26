/* globals module Promise */

module.exports = function(models) {
    let { User } = models;

    return {
        findUserByCredentials(username, salt, hashPass) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, salt, hashPass }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};