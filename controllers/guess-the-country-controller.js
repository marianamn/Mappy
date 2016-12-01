/* globals module */

const GUESS_THE_COUNTRY_INCREASING_VALUE = 1,
    GUESS_THE_COUNTRY_SCORE_TYPE = "guessTheCountryScore";

module.exports = function (params) {
    let { data, validator } = params;
    return {
        getRandomCountryQuestion(req, res) {
            // TODO: add caching to make less queries to DB
            data.getGameData()
                .then(countriesData => {
                    let requiredCountryNameQuestion = countriesData[Math.floor(Math.random() * countriesData.length)].name;
                    let euValues = [];

                    for (let i = 0; i < countriesData.length; i += 1) {
                        euValues[i] = countriesData[i].euValue;
                    }

                    let isCorrect = false;
                    let isIncorrect = true;

                    if (req.session.isCorrectAnswer === undefined) {
                        isIncorrect = false;
                    }

                    if (req.session.isCorrectAnswer === true) {
                        isCorrect = true;
                        isIncorrect = false;
                    }

                    let user = req.user;

                    return res.render("map/guess-the-country-question", { user, requiredCountryNameQuestion, euValues, isCorrect, isIncorrect });
                });
        },
        evaluateGuessTheCountryAnswer(req, res) {
            if (isNaN(Number(req.params.selectedCountryEuValue)) ||
                Number(req.params.selectedCountryEuValue) < 0 ||
                !req.params.requiredCountryName ||
                !validator.validateIsStringValid(req.params.requiredCountryName)) {
                return res.redirect("/game/guess-the-country");
            }

            data.getCountryByEuValue(req.params.selectedCountryEuValue)
                .then(country => {
                    if (!country) {
                        return res.redirect("/game/guess-the-country");
                    }

                    let selectedCountryName = country.name.toLowerCase().replace(/-/g, " ");
                    let requiredCountryName = req.params.requiredCountryName.toLowerCase().replace(/-/g, " ");

                    if (selectedCountryName === requiredCountryName) {
                        req.session.isCorrectAnswer = true;

                        return data.increaseUserScore(
                            req.user.id,
                            GUESS_THE_COUNTRY_SCORE_TYPE,
                            GUESS_THE_COUNTRY_INCREASING_VALUE);
                    } else {
                        req.session.isCorrectAnswer = false;
                    }
                })
                .then(() => {
                    return res.redirect(301, "/game/guess-the-country");
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
};