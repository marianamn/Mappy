/* globals module */

module.exports = function () {
    return {
        getChat(req, res) {
            res.render("communication/chat", {
                user: req.user
            });
        }
    };
};