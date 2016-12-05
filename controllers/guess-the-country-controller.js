/* globals module */

const GUESS_THE_COUNTRY_INCREASING_VALUE = 1,
    GUESS_THE_COUNTRY_SCORE_TYPE = "guessTheCountryScore";

module.exports = function (params) {
    let { data, validator } = params;
    return {
        getRandomCountryQuestion(req, res) {
            data.getGameData()
                .then(countriesData => {
                    let requiredCountryNameQuestion = countriesData[Math.floor(Math.random() * countriesData.length)].name;
                    let euValues = [];

                    for (let i = 0; i < countriesData.length; i += 1) {
                        euValues[i] = countriesData[i].euValue;
                    }

                    let firstTime = true;
                    let user = req.user;

                    return res.render("map/guess-the-country-question", {
                        user,
                        requiredCountryNameQuestion,
                        euValues,
                        firstTime
                    });
                });
        },
        evaluateGuessTheCountryAnswer(req, res) {
            let isCorrect;
            data.getCountryByEuValue(req.params.selectedCountryEuValue)
                .then(country => {
                    if (!country) {
                        return res.redirect("/game/guess-the-country");
                    }

                    let selectedCountryName = country.name.toLowerCase().replace(/-/g, " ");
                    let requiredCountryName = req.params.requiredCountryName.toLowerCase().replace(/-/g, " ");

                    if (selectedCountryName === requiredCountryName) {
                        isCorrect = true;
                        return data.increaseUserScore(
                            req.user.id,
                            GUESS_THE_COUNTRY_SCORE_TYPE,
                            GUESS_THE_COUNTRY_INCREASING_VALUE);
                    }

                })
                .then(() => {
                    return data.getGameData();
                })
                .then((countriesData) => {
                    let requiredCountryNameQuestion = countriesData[Math.floor(Math.random() * countriesData.length)].name;
                    let euValues = [];

                    for (let i = 0; i < countriesData.length; i += 1) {
                        euValues[i] = countriesData[i].euValue;
                    }
                    let user = req.user;

                    let requiredCountryForHref = requiredCountryNameQuestion.toLowerCase().replace(/ /g, "-");
                    return res.render("map/guess-the-country-question", {
                        user,
                        requiredCountryNameQuestion,
                        requiredCountryForHref,
                        euValues,
                        isCorrect
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
};