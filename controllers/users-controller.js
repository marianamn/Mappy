/* globals module */

module.exports = function (data) {
    return {
        getUserByUsername(req, res) {
            let username = req.params.username;

            data.findUserByUsername(username)
                .then(foundUser => {
                    let user = req.user;
                    let ownProfile = foundUser.username === user.username;
                    let isAdmin = user.isAdmin;

                    let guessTheCountryStars = Math.floor(foundUser.guessTheCountryScore / 100);
                    let testYourKnowledgeStars = Math.floor(foundUser.testYourKnowledgeScore / 100);
                    
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
        returnAllUsernames(req, res) {
            return data.getAllUsernames()
                .then(usernames => {
                    let responseUsernames = usernames.map(u => u.username);
                    res.json(responseUsernames);
                });
        },
        addComment(req, res) {
            let usernameToAddComment = req.params.username;
            let commentToAdd = req.body.commentToAdd;
            let user = req.user;
            if (!user) {
                return res.json({
                    error: "UserNotAuthenticated",
                    message: "Authenticate your username first"
                });
            }

            let author = user.username;

            data.addComment(usernameToAddComment, commentToAdd, author)
                .then((user) => {
                    res.json({
                        comments: user.comments,
                        message: "Comment added successfuly"
                    });
                }, (err) => {
                    res.json({
                        error: err,
                        message: "Comment is not added"
                    });
                });
        },
        updateUserRole(req, res) {
            let username = req.params.username;
            let isAdmin = req.body.isAdmin;


            data.modifyUserRole(username, isAdmin)
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
                    res.json({ error });
                });
        }
    };
};