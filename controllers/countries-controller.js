/* globals module */

module.exports = function(data) {
    return {
        allCountries(req, res) {
            data.getAllCountries()
                .then(countries => {
                    let user = req.user;

                    res.render("countries/all-countries", {
                        countries,
                        user
                    });
                });
        },
        countryDetails(req, res) {
            let id = req.params.id;
            data.getCountryById(id)
                .then(country => {
                    let user = req.user;

                    res.render("countries/detail-country", {
                        country,
                        user
                    });
                });
        }
    };
};