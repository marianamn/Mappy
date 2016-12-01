/* globals module */

module.exports = function(params) {
    let { data } = params;
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
            if (isNaN(id) || id < 0) {
                return res.redirect("/countries");
            }

            data.getCountryById(id)
                .then(country => {
                    if (!country) {
                        return res.redirect("/countries");
                    }
                    let user = req.user;

                    res.render("countries/detail-country", {
                        country,
                        user
                    });
                })
                .catch(() => {
                    res.redirect("/countries");
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