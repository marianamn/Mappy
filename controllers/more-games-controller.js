/* globals module */

module.exports = function(params) {
    let { data, validator } = params;

    return {
        allGames(req, res) {
            data.getAllGames()
                .then(games => {
                    let user = req.user;
                    res.render("more-games/more-games", {
                        result: games,
                        user
                    });
                });
        }
    };
};

