/* globals module */

module.exports = function (models, validator) {
    let { Question, Country } = models;

    return {
        getQuestionsIdsByCountry(country) {
            return new
                Promise((resolve, reject) => {
                    Question.find({ country }, "_id", (err, questionIds) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(questionIds);
                    });
                });
        },
        getQuestionById(id) {
            return new Promise((resolve, reject) => {
                Question.findOne({ _id: id }, (err, question) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(question);
                });
            });
        },
        createQuestion(question, answers, country) {
            if (!validator.validateIsStringValid(question)) {
                return Promise.reject("Question name fail");
            }

            if (!validator.validateStringLength(question, 5, 100)) {
                return Promise.reject("Question name length fail");
            }

            if (!Array.isArray(answers)) {
                return Promise.reject("Answers must be array");
            } else {
                answers.forEach((value) => {
                    if (!validator.validateIsStringValid(value.answer)) {
                        return Promise.reject("Some of the answers fail");
                    }

                    if (typeof value.isCorrect !== "boolean") {
                        return Promise.reject("Some of the answers property isCorrect is not boolean");
                    }
                });
            }

            if (!validator.validateIsStringValid(country)) {
                return Promise.reject("Country name fail");
            }

            return new Promise((resolve, reject) => {
                Country.findOne({ name: country }, (err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve();
                });
            })
                .then(() => {
                    let newQuestion = new Question({
                        question,
                        answers,
                        country
                    });

                    newQuestion.save((err) => {
                        if (err) {
                            return Promise.reject(err);
                        }

                        return Promise.resolve(newQuestion);
                    });
                });
        }
    };
};