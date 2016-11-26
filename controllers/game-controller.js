/* globals module console */

module.exports = function(data) {
    return {
        getFindTheCountryQuestion(req, res) {

            return res.render("map/guess-the-country-question", {

            });
        },
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-question", {

            });
        },
        evaluateGuessTheCountryAnswer(req, res) {
            let selectedCountryName = req.params.selectedCountryName;



            // res.redirect("/game/guess-the-country");

            // return;
        }
    };
};