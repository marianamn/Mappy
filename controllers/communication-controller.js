/* globals module */

module.exports = function (params) {
    let {data, validator} = params;
    return {
        getChat(req, res) {
            res.render("communication/chat", {
                user: req.user
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