/* globals module */

module.exports = function(data) {
    return {
        allCountries(req, res) {
            data.allCountries()
                .then(countries => {
                    res.render("countries/allCountries", {
                        result: countries
                    });
                });
        },
        countryDetails(req, res) {
            let id = req.params.id;
            data.getCountryById(id)
                .then(country => {
                    res.render("countries/detail-country", {
                        result: country
                    });
                });
        }
    };
};