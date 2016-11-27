/* globals module */

module.exports = function(data) {
    return {
        totalRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return b.guessTheCountryScore + b.testYourKnowledgeScore - a.guessTheCountryScore + a.testYourKnowledgeScore;
                    });
                    res.render("rankings/ranking", {
                        result: sortedUsers
                    });
                });
        },
        guessTheCountryScoreRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return b.guessTheCountryScore - a.guessTheCountryScore;
                    });
                    res.render("rankings/guess-the-country-score", {
                        result: sortedUsers
                    });
                });
        },
        testYourKnolegeScoreRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return b.testYourKnowledgeScore - a.guessTheCountryScore;
                    });
                    res.render("rankings/test-your-knowledg-score", {
                        result: sortedUsers
                    });
                });
        }
    };
};