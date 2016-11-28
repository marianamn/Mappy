/* globals module */

module.exports = function(data) {
    return {
        getTerms(req, res) {
            let user = req.user;

            return res.render("terms-of-use/termsOfUse", { user });
        }
    };
};