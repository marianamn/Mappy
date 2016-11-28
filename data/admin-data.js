/* globals module Promise */

module.exports = function (models) {
    let { User } = models;

    return {
        findUserByCredentials(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};