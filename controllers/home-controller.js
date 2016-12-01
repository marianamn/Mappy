/* globals module */

module.exports = function() {
    return {
        home(req, res) {
            let user = req.user;
            return res.render("home/home", {
                user
            });
        }
    };
};