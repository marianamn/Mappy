/* globals module */

module.exports = function (data) {
    return {
        getPanel(req, res) {
            res.render("admin/panel", {
                user: req.user
            });
        },
        getCreateQuestion(req, res) {
            data.getAllCountryNames()
                .then(countries => {
                    res.render("admin/createQuestion", {
                        user: req.user,
                        countries
                    });
                });

        },
        createQuestion(req, res) {
            data.createQuestion(req.body.question, req.body.answers, req.body.country)
                .then(res.status(201).json({ "message": "Successfully created message." }));
        }
    };
};