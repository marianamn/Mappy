/* globals module */

module.exports = function (data) {
    return {
        getChat(req, res) {
            res.render("communication/chat", {
                user: req.user
            });
        }
    };
};