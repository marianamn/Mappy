/* globals module */

module.exports = function(data) {
    return {
        register(req, res) {
            let {
                username,
                password,
                confirmPassword,
                email,
                profileImgURL,
                firstName,
                lastName
            } = req.body;

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
                    res.json({ "message": "You have been registered successfully" });
                })
                .catch(err => {
                    res.json(err);
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