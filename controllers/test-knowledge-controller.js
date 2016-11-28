/* globals module */

module.exports = function (data) {
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

            data.getQuestionsIdsByCountry(countryName)
                .then(questionIds => {
                    let randomIndex = Math.floor(Math.random() * questionIds.length);
                    let randomQuestionId = questionIds[randomIndex];

                    return data.getQuestionById(randomQuestionId);
                })
                .then(question => {
                    let user = req.user;
                    res.render("questions/question", { user, question });
                });
        },
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
                    return data.getQuestionsIdsByCountry(question.country);
                })
                .then(questionIds => {
                    let randomIndex = Math.floor(Math.random() * questionIds.length);
                    let randomQuestionId = questionIds[randomIndex];

                    return data.getQuestionById(randomQuestionId);
                })
                .then(question => {
                    let answers = question.answers.map(ans => ans.answer);

                    let newQuestion = {};
                    newQuestion.question = question.question;
                    newQuestion.answers = answers;
                    newQuestion.id = question._id;

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