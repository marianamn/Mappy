/* globals module */

module.exports = function (data) {
    return {
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-map");
        },
        redirectToQuestion(req, res) {
            let countryName = req.params.countryName;

            data.getAllQuestionsByCountryName(countryName)
                .then(questions => {
                    let questionId = questions[Math.floor(Math.random() * questions.length)]._id;

                    res.redirect("/game/test-your-knowledge/" + countryName + "/" + questionId);
                });
        },
        getQuestion(req, res) {
            let questionId = req.params.id;

            data.getQuestionById(questionId)
                .then(question => {
                    res.render("questions/question", { question });
                });
        }
    };
};