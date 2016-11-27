/* globals module */

const GUESS_THE_COUNTRY_INCREASING_VALUE = 1,
    GUESS_THE_COUNTRY_SCORE_TYPE = "guessTheCountryScore";

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
            return res.render("map/test-your-knowledge-map", {});
        },
        evaluateGuessTheCountryAnswer(req, res) {
            data.getCountryByEuValue(req.params.selectedCountryName)
                .then(country => {
                    let selectedCountryName = country.name.toLowerCase().replace(/-/g, " ");
                    let requiredCountryName = req.params.requiredCountryName.toLowerCase().replace(/-/g, " ");

                    if (selectedCountryName === requiredCountryName) {
                        return data.increaseUserScore(
                            req.user.id,
                            GUESS_THE_COUNTRY_SCORE_TYPE,
                            GUESS_THE_COUNTRY_INCREASING_VALUE);
                    }
                })
                .then(() => {
                    res.redirect("/game/guess-the-country");
                })
                .catch(err => {
                    console.log(err);
                });

            // TODO: clean the logic about  redirects (if user's answer is not correct is it necessary to redirect
            // or let the user guessing country)
            // if (selectedCountryName === requiredCountryName) {
            //     data.increaseUserScore(
            //         req.user.id,
            //         GUESS_THE_COUNTRY_SCORE_TYPE,
            //         GUESS_THE_COUNTRY_INCREASING_VALUE)
            //         .then(() => {
            //             res.redirect("/game/guess-the-country");
            //         })
            //         .catch(err => {
            //             console.log(err);
            //         });
            // } else {
            //     res.redirect("/game/guess-the-country");
            // }
        }
    };
};