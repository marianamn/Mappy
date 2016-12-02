/* globals module */

const TEST_KNOWLEDGE_INCREASING_VALUE = 1,
    TEST_KNOWLEDGE_SCORE_TYPE = "testYourKnowledgeScore";

function shuffle(array) {
    for (let i = array.length; i; i -= 1) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

module.exports = function (params) {
    let { data, validator } = params;
    return {
        getTestKnowledgeMap(req, res) {
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

            if (!countryName || !validator.validateIsStringValid(countryName)) {
                return res.redirect("/game/test-your-knowledge");
            }

            data.getQuestionsIdsByCountry(countryName)
                .then(questionIds => {

                    let randomIndex = Math.floor(Math.random() * questionIds.length);
                    let randomQuestionId = questionIds[randomIndex];

                    return data.getQuestionById(randomQuestionId);
                })
                .then(question => {
                    let user = req.user;
                    if (question) {
                        shuffle(question.answers);
                    }
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
                    console.log(question.country);

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
                        return data.increaseUserScore(
                            req.user._id,
                            TEST_KNOWLEDGE_SCORE_TYPE,
                            TEST_KNOWLEDGE_INCREASING_VALUE);
                    }
                })
                .then(() => {
                    res.json(resBody);
                })
                .catch(err => {
                    res.json({ err }); //log this
                });
        }
    };
};