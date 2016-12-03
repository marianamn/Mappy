/* globals module */

const REQUIRED_POINTS_PER_STAR = 45;

module.exports = function(params) {
    let { data, validator } = params;
    return {
        getUserProfile(req, res) {
            let username = req.params.username;

            data.getUserByUsername(username)
                .then(foundUser => {
                    if (!foundUser) {
                        return res.redirect("/");
                    }

                    let user = req.user;
                    let ownProfile = foundUser.username === user.username;
                    let isAdmin = user.isAdmin;

                    let guessTheCountryStars = Math.floor(foundUser.guessTheCountryScore / REQUIRED_POINTS_PER_STAR);
                    let testYourKnowledgeStars = Math.floor(foundUser.testYourKnowledgeScore / REQUIRED_POINTS_PER_STAR);

                    res.render("users/profile", {
                        ownProfile,
                        isAdmin,
                        foundUser,
                        user,
                        guessTheCountryStars,
                        testYourKnowledgeStars
                    });
                });
        },
        getAllUsernames(req, res) {
            return data.getAllUsernames()
                .then(usernames => {
                    let responseUsernames = usernames.map(u => u.username);
                    res.json(responseUsernames);
                });
        },
        updateUserRole(req, res) {
            let username = req.params.username;
            let isAdmin = req.body.isAdmin;


            data.updateUserRole(username, isAdmin)
                .then(user => {
                    let role = "normal user";
                    if (user.isAdmin) {
                        role = "admin";
                    }

                    res.json({
                        message: `${user.username} is now ${role}`
                    });
                })
                .catch(error => {
                    res.json({ error }); //log this
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
        getUserByUserId(req, res) {
            let userId = req.params.userId;

            data.getUserById(userId)
                .then(foundUser => {
                    if (!foundUser) {
                        return res.redirect("/");
                    }

                    let user = req.user;
                    let ownProfile = foundUser.username === user.username;
                    let isAdmin = user.isAdmin;

                    let guessTheCountryStars = Math.floor(foundUser.guessTheCountryScore / REQUIRED_POINTS_PER_STAR);
                    let testYourKnowledgeStars = Math.floor(foundUser.testYourKnowledgeScore / REQUIRED_POINTS_PER_STAR);

                    res.render("users/profile", {
                        ownProfile,
                        isAdmin,
                        foundUser,
                        user,
                        guessTheCountryStars,
                        testYourKnowledgeStars
                    });
                });
        }
    };
};