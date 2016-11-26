/* globals module */

module.exports = function(data) {
    return {
        getFindTheCountryQuestion(req, res) {
            return res.render("map/guess-the-country-question", {

            });
        },
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-question", {

            });
        }
    };
};