/* globals module */

module.exports = function(data) {
    return {
        getTerms(req, res) {
            return res.render("terms-of-use/termsOfUse");
        }
    };
};