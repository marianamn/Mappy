/* globals module */

module.exports = function (data) {
    return {
        getPanel(req, res) {
            res.render("admin/panel", {
                user: req.user
            });
        },
        createQuestion(req, res) {
            res.render("admin/createQuestion", {
                user: req.user
            });
        }
    };
};