/* globals module */

module.exports = function(data) {
    return {
        totalRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return b.guessTheCountryScore + b.testYourKnowledgeScore - a.guessTheCountryScore + a.testYourKnowledgeScore;
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
                        return b.guessTheCountryScore - a.guessTheCountryScore;
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
                        return b.testYourKnowledgeScore - a.guessTheCountryScore;
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