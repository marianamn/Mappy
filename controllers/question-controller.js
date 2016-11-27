/* globals module */

module.exports = function (data) {
    return {
        evaluateQuestion(req, res) {
            let body = req.body;
            let requestAnswer = body.choosedAnswer;
            let id = body.questionId;
            let resBody = {
                isCorrect: false
            };

            data.getQuestionById(id)
                .then(question => {
                    let correctAnswer = question.answers.find(ans => ans.isCorrect).answer;
                    if (correctAnswer === requestAnswer) {
                        resBody.isCorrect = true;
                    }
                    return data.getAllQuestionsByCountryName(question.country);
                })
                .then(questions => {
                    let question = questions[Math.floor(Math.random() * questions.length)];
                    let answers = question.answers.map(ans => ans.answer);

                    let newQuestion = {};
                    newQuestion.question = question.question;
                    newQuestion.answers = answers;
                    resBody.newQuestion = newQuestion;

                    if (resBody.isCorrect) {
                        return data.increaseUserScore(req.user._id, "testYourKnowledgeScore", 1);
                    }
                })
                .then(() => {
                    res.json(resBody);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
};