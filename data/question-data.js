/* globals module */

module.exports = function (models) {
    let { Question } = models;

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
        }
    };
};