/* globals module */

module.exports = function (req, res, next) {
    if (!req.user.isAdmin) {
        return res.redirect("/auth/unauthorized");
    }

    return next();
};