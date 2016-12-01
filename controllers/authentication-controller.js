/* globals module */

module.exports = function(params) {
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
        unauthorized(req, res) {
            return res.render("authentication/unauthorized", {
                user: req.user
            });
        }
    };
};