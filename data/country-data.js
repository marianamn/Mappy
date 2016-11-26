/* globals module */

module.exports = function(models) {
    let { Country } = models;

    return {
        getAllCountryNames() {
            return new Promise((resolve, reject) => {
                Country.find({}).select("name", (err, countryNames) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(countryNames);
                });
            });
        }
    };
};