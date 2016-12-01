/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        totalRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return (parseFloat(b.guessTheCountryScore) + parseFloat(b.testYourKnowledgeScore)) - (parseFloat(a.guessTheCountryScore) + parseFloat(a.testYourKnowledgeScore));
                    });
                    let user = req.user;
                    res.render("rankings/ranking", {
                        result: sortedUsers,
                        user
                    });
                });
        },
        guessTheCountryScoreRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return parseFloat(b.guessTheCountryScore) - parseFloat(a.guessTheCountryScore);
                    });
                    let user = req.user;
                    res.render("rankings/guess-the-country-score", {
                        result: sortedUsers,
                        user
                    });
                });
        },
        testYourKnolegeScoreRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return parseFloat(b.testYourKnowledgeScore) - parseFloat(a.testYourKnowledgeScore);
                    });
                    let user = req.user;
                    res.render("rankings/test-your-knowledg-score", {
                        result: sortedUsers,
                        user
                    });
                });
        }
    };
};