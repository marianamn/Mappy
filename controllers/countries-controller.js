/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
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
        },
        getAllCountriesNames(req, res) {
            data.getAllCountryNames()
                .then(countriesNames => {
                    res.json({ countriesNames });
                });
        }
    };
};