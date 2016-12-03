/* globals module */
const DEFAULT_PAGE = 1,
    COUNTRIES_PER_PAGE = 12;

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
        getAllCountries({ page, pageSize }) {
            page = page || DEFAULT_PAGE;
            pageSize = pageSize || COUNTRIES_PER_PAGE;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Country.find()
                        .sort({ name: "asc" })
                        .limit(pageSize)
                        .skip((page - 1) * pageSize)
                        .exec((err, countries) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(countries);
                        });
                }), new Promise((resolve, reject) => {
                    Country.count({})
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]).then(results => {
                let [countries, count] = results;
                return { countries, count };
            });
        },
        getCountryById(id) {
            return new Promise((resolve, reject) => {
                Country.findById(id, (err, country) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(country || null);
                });
            });
        },
        getCountryByEuValue(euValue) {
            return new Promise((resolve, reject) => {
                Country.findOne({ euValue }, (err, country) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(country || null);
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