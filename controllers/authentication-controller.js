/* globals module */

const usernamePattern = /^[a-zA-Z0-9_.]{6,20}$/;

module.exports = function (data) {
    return {
        register(req, res) {
            let {
                username,
                password,
                confirmPassword,
                email,
                profileImageURL,
                firstName,
                lastName
            } = req.body;

            if (!usernamePattern.test(username)) {
                req.session.error = "The username should be between 6 and 20 characters long and can contain Latin letters, digits and the symbols (underscore), and (dot)";
                res.redirect("/auth/register");
                return;
            }

            if (password !== confirmPassword) {
                req.session.error = "Passwords do not match!";
                res.redirect("/auth/register");
                return;
            }

            let salt = data.encryption.generateSalt();
            let hashPass = data.encryption.generateHashedPassword(salt, password);

            data.createUser(
                username,
                firstName,
                lastName,
                email,
                profileImageURL,
                salt,
                hashPass)
                .then(() => {
                    return res.redirect("/auth/login");
                });
        },
        logout(req, res) {
            req.logout();
            return res.redirect("/");
        },
        getRegisterForm(req, res) {
            return res.render("authentication/register");
        },
        getLoginForm(req, res) {
            return res.render("authentication/login");
        },
        getProfile(req, res) {
            return res.render("authentication/profile", {
                user: req.user
            });
        },
        updateProfile(req, res) {
            if (req.body.password) {
                data.updateUserAndPassword(req.body)
                    .then(res.json({ "message": "Your password is updated " }));
            } else {
                data.updateUser(req.body)
                    .then(res.json({ "message": "Profile updated successfully." }));
            }
        },
        unauthorized(req, res) {
            return res.render("authentication/unauthorized", {
                user: req.user
            });
        }
    };
};