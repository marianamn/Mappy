/* globals module */

module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }

    return next();
};

