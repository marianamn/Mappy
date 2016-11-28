/* globals module */

module.exports = function(data) {
    return {
        getTestKnowledgeQuestion(req, res) {
            data.getGameData()
                .then(countriesData => {
                    return res.render("map/test-your-knowledge-map", {
                        user: req.user,
                        countriesData
                    });
                });
        },
        getQuestion(req, res) {
            let countryName = req.params.countryName;

            data.getAllQuestionsByCountryName(countryName)
                .then(questions => {
                    let question = questions[Math.floor(Math.random() * questions.length)];
                    res.render("questions/question", { question });
                });
        }
    };
};