/* globals module */
const TOP_USERS = 10;

module.exports = function(params) {
    let { data, validator } = params;
    return {
        totalRanking(req, res) {
            data.getAllUsers()
                .then(users => {
                    let sortedUsers = users.sort((a, b) => {
                        return (parseFloat(b.guessTheCountryScore) + parseFloat(b.testYourKnowledgeScore)) - (parseFloat(a.guessTheCountryScore) + parseFloat(a.testYourKnowledgeScore));
                    });

                    let topTen = sortedUsers.slice(0, TOP_USERS);
                    let user = req.user;
                    res.render("rankings/ranking", {
                        result: topTen,
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
                    let topTen = sortedUsers.slice(0, TOP_USERS);
                    let user = req.user;
                    res.render("rankings/guess-the-country-score", {
                        result: topTen,
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
                    let topTen = sortedUsers.slice(0, TOP_USERS);
                    let user = req.user;
                    res.render("rankings/test-your-knowledg-score", {
                        result: topTen,
                        user
                    });
                });
        }
    };
};