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
        }
    };
};