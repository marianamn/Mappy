/* globals require, module */

let encryption = require("../utilities/encryption"),
    users = require("../data/usersData");

const CONTROLLER_NAME = "users";

function getRegister(req, res) {
    res.render(`${CONTROLLER_NAME}/register`);
}

function postRegister(req, res) {
    let newUserData = req.body;
    let pattern = /^[a-zA-Z0-9_.]{6,20}$/;

    if (!pattern.test(newUserData.username)) {
        req.session.error = "The username should be between 6 and 20 characters long and can contain Latin letters, digits and the symbols (underscore), and (dot)";
        res.redirect("/register");
        return;
    }

    if (newUserData.password !== newUserData.confirmPassword) {
        req.session.error = "Passwords do not match!";
        res.redirect("/register");
    } else {
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        users.create(newUserData, (error, user) => {
            if (error) {
                console.log(`Failed to register new user: ${error}`);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.status(400);
                    return res.send({ reason: err.toString()} );
                } else {
                    res.redirect("/");
                }
            });
        });
    }
}

function getLogin(req, res) {
    res.render(`${CONTROLLER_NAME}/login`);
}

module.exports = {
    getRegister,
    postRegister,
    getLogin
};