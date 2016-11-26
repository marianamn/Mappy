/* globals module */

module.exports = function (models) {
    let { Country } = models;

    return {
        getAllCountriesByName() {
            return new Promise((resolve, reject) => {
                Country.find({}).select("name", (err, countryNames) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(countryNames);
                });
            });
        },
        allCountries() {
            return new Promise((resolve, reject) => {
                Country.find({}, (err, country) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(country);
                });
            });
        },
        getCountryById(id) {
            return new Promise((resolve, reject) => {
                Country.findById(id, (err, country) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(country);
                });
            });
        }
    };
};