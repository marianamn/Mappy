/* globals module */

module.exports = function (data) {
    return {
        getUserByUsername(req, res) {
            let username = req.params.username;

            data.findUserByUsername(username)
                .then(user => {
                    let loggedUser = req.user;

                    res.render("users/simple-user", {
                        user,
                        loggedUser
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