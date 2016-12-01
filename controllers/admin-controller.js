/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        getPanel(req, res) {
            res.render("admin/panel", {
                user: req.user
            });
        },
        getCreateQuestionForm(req, res) {
            data.getAllCountryNames()
                .then(countries => {
                    res.render("admin/create-question", {
                        user: req.user,
                        countries
                    });
                });

        },
        createQuestion(req, res) {
            data.createQuestion(req.body.question, req.body.answers, req.body.country)
                .then(res.status(201).json({ "message": "Successfully created message." }))
                .catch(err => {
                    console.log(err);
                });
        }
    };
};