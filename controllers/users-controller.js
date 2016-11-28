/* globals module */

module.exports = function(data) {
    return {
        getUserByUsername(req, res) {
            let username = req.params.username;

            data.findUserByUsername(username)
                .then(foundUser => {
                    let user = req.user;
                    let ownProfile = false;

                    if (foundUser.username === user.username || user.isAdmin === true) {
                        console.log("same");
                        ownProfile = true;
                    }

                    res.render("users/profile", {
                        ownProfile,
                        foundUser,
                        user
                    });
                });
        },
        returnAllUsernames(req, res) {
            return data.getAllUsernames()
                .then(usernames => {
                    let responseUsernames = usernames.map(u => u.username);
                    res.json(responseUsernames);
                });
        }
    };
};