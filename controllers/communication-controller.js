/* globals module */

module.exports = function (params) {
    let { data, validator } = params;
    return {
        getChat(req, res) {
            data.getLatestMessages()
                .then(latestAnswers => {
                    latestAnswers.reverse();
                    res.render("communication/chat", {
                        user: req.user,
                        answers: latestAnswers
                    });
                });
        },
        createNewChatAnswer(req, res) {
            let answer = req.body.answer;
            let user = req.body.user;
            let datetime = req.body.datetime;

            data.createChatMessage(user, answer, datetime)
                .then(answerDb => {
                    res.json(answerDb);
                });
        }
    };
};