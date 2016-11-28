/* globals module */

module.exports = function(data) {
    return {
        home(req, res) {
            let user = req.user;
            return res.render("home/home", {
                user
            });
        }
    };
};