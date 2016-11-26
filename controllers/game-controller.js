/* globals module console */

module.exports = function(data) {
    return {
        getFindTheCountryQuestion(req, res) {
            data.getAllCountryNames()
                .then(countryNames => {

                    let nameIndex = Math.floor(Math.random() * (countryNames.length - 1)) + 1;
                    let currentCountryNameQuestion = countryNames[nameIndex];

                    return res.render("map/guess-the-country-question", { result: currentCountryNameQuestion });
                });
        },
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-question", {});
        },
        evaluateGuessTheCountryAnswer(req, res) {
            let selectedCountryName = req.params.selectedCountryName;

            // res.redirect("/game/guess-the-country");

            // return;
        }
    };
};