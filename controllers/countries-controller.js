/* globals module */

module.exports = function(data) {
    return {
        allCountries(req, res) {
            return res.render("countries/allCountries", {
                user: req.user
            });
        }
    };
};