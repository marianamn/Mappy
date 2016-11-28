/* globals module */

module.exports = function (models) {
    let { Question } = models;

    return {
        getAllQuestionsByCountryName(country) {
            return new Promise((resolve, reject) => {
                Question.find({ country }, (err, questions) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(questions);
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
            let newQuestion = new Question({
                question,
                answers,
                country
            });

            return new Promise((resolve, reject) => {
                newQuestion.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newQuestion);
                });
            });
        }
    };
};