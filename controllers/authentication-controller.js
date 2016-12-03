/* globals module */

function validateUser({ validator, username, firstName, lastName, profileImgURL }) {
    let validatorError = {};
    validatorError.messages = [];

    if (!validator.validateStringLength(username, 3, 50)) {
        validatorError.error = true;
        validatorError.messages.push("Error: Username must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(username)) {
        validatorError.error = true;
        validatorError.messages.push("Username fail");
    }

    if (!validator.validateStringLength(firstName, 3, 50)) {
        validatorError.error = true;
        validatorError.messages.push("Error: First name must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(firstName)) {
        validatorError.error = true;
        validatorError.messages.push("First name fail");
    }

    if (!validator.validateStringLength(lastName, 3, 50)) {
        validatorError.error = true;
        validatorError.message.push("Error: Last name must be between 3 and 50 symbols");
    }

    if (!validator.validateIsStringValid(lastName)) {
        validatorError.error = true;
        validatorError.messages.push("Last name fail");
    }

    if (profileImgURL && !validator.validateImageUrl(profileImgURL)) {
        validatorError.error = true;
        validatorError.messages.push("Invalid image url");
    }

    return validatorError;
}

const passport = require("passport");

module.exports = function (params) {
    let { data, validator } = params;
    return {
        register(req, res) {
            let {
                username,
                password,
                email,
                profileImgURL,
                firstName,
                lastName
            } = req.body;

            let validatorError = validateUser({ validator, username, firstName, lastName, profileImgURL });

            if (!validator.validateEmail(email)) {
                validatorError.error = true;
                validatorError.messages.push("Email fail");
            }

            if (validatorError.error) {
                let error = {
                    messages: validatorError.messages
                };

                return res.json({ error });
            }

            let salt = data.encryption.generateSalt();
            let hashPass = data.encryption.generateHashedPassword(salt, password);

            data.createUser(
                username,
                firstName,
                lastName,
                email,
                profileImgURL,
                salt,
                hashPass)
                .then(() => {
                    res.status(201).json({ "message": "You have been registered successfully" });
                })
                .catch(err => {
                    res.json(err);
                });
        },
        login(req, res, next) {
            passport.authenticate("local", (err, user) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.send({ success: false, message: "Invalid username or password" });
                }

                req.login(user, loginErr => {
                    if (loginErr) {
                        return next(loginErr);
                    }

                    return res.status(200).send({ success: true, message: "Successfully logged in" });
                });
            })(req, res, next);
        },
        logout(req, res) {
            data.createAnalytics(req.session);
            req.session.destroy();
            req.logout();
            return res.status(200).redirect("/");
        },
        getRegisterForm(req, res) {
            return res.status(200).render("authentication/register");
        },
        getLoginForm(req, res) {
            return res.status(200).render("authentication/login");
        },
        unauthorized(req, res) {
            return res.status(200).render("authentication/unauthorized", {
                user: req.user
            });
        }
    };
};