/* globals module */

module.exports = function(data) {
    return {
        getFindTheCountryQuestion(req, res) {
            return res.render("/map/map", {

            });
        },
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/map", {

            });
        }
    };
};