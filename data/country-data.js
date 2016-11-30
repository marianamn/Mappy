/* globals module */

module.exports = function(models) {
    let { Country } = models;

    return {
        getAllCountryNames() {
            return new Promise((resolve, reject) => {
                Country.find({}, "name", (err, countryNames) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(countryNames);
                });
            });
        },
        getAllCountries() {
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
        },
        getCountryByEuValue(euValue) {
            return new Promise((resolve, reject) => {
                Country.findOne({ euValue }, (err, country) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(country);
                });
            });
        },
        getGameData() {
            return new Promise((resolve, reject) => {
                Country.find({}, "name euValue", (err, countryData) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(countryData);
                });
            });
        }
    };
};