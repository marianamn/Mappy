/* globals require, module */

const data = require("../data/usersData");

const CONTROLLER_NAME = "profile";

function getProfile(req, res) {
    if (!req.user) {
        res.redirect("/login");
        res.session.error = "You must be logged in!";
    }
    res.render(`${CONTROLLER_NAME}/profile`);
}

function postProfile(req, res) {
    if (!req.user) {
        res.redirect("/login");
        res.session.error = "You must be logged in!";
    }
    let newUserData = req.body;
    newUserData.id = req.user._id;

    data.update(newUserData, (err, success) => {
        if (err) {
            req.session.error = err;
        } else {
            req.session.success = success;
            res.redirect("/profile");
        }

        res.redirect("/profile");
    });
}

module.exports = {
    getProfile,
    postProfile
};