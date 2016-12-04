/* globals module */

module.exports = function (models) {
    let { MoreGames } = models;
    return {
        getAllGames() {
            return new Promise((resolve, reject) => {
                MoreGames.find({}, (err, moreGames) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(moreGames);
                });
            });
        }
    };
};