/* globals module console */

module.exports = function(data) {
    return {
        getFindTheCountryQuestion(req, res) {
            data.getAllCountryNames()
                .then(countryNames => {

                    let currentCountryNameQuestion = countryNames[Math.floor(Math.random() * countryNames.length)].name;

                    return res.render("map/guess-the-country-question", { currentCountryNameQuestion });
                });
        },
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-question", {});
        },
        evaluateGuessTheCountryAnswer(req, res) {

            let selectedCountryName = req.params.selectedCountryName.toLowerCase().replace(/-/g, " ");
            let requiredCountryName = req.params.requiredCountryName.toLowerCase().replace(/-/g, " ");

            if (selectedCountryName === requiredCountryName) {
                console.log("Success");
                // TODO: add points to user
            }

            res.redirect("/game/guess-the-country");
        }
    };
};