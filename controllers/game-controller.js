/* globals module console */

module.exports = function(data) {
    return {
        getFindTheCountryQuestion(req, res) {
            data.getAllCountryNames()
                .then(countryNames => {

                    let nameIndex = Math.floor(Math.random() * (countryNames.length - 1)) + 1;
                    let currentCountryNameQuestion = countryNames[nameIndex].name;

                    return res.render("map/guess-the-country-question", { currentCountryNameQuestion });
                });
        },
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-question", {});
        },
        evaluateGuessTheCountryAnswer(req, res) {
            let selectedCountryName = req.params.selectedCountryName;
            console.log(req.headers);
            // res.redirect("/game/guess-the-country");

            // return;
        }
    };
};