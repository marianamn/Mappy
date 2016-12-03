/* globals module */

module.exports = function (params) {
    let { data, validator } = params;
    return {
        getPanel(req, res) {
            res.status(200).render("admin/panel", {
                user: req.user
            });
        },
        getCreateQuestionForm(req, res) {
            data.getAllCountryNames()
                .then(countries => {
                    res.status(200).render("admin/create-question", {
                        user: req.user,
                        countries
                    });
                });

        },
        createQuestion(req, res) {
            let validatorError = {};
            validatorError.messages = [];

            let question = req.body.question;
            let answers = req.body.answers;
            let country = req.body.country;

            if (!validator.validateIsStringValid(question)) {
                validatorError.error = true;
                validatorError.messages.push("Question is not valid");
            }

            if (!validator.validateStringLength(question, 5, 100)) {
                validatorError.error = true;
                validatorError.messages.push("Question length must be between 5 and 100 characters");
            }

            if (!Array.isArray(answers)) {
                validatorError.error = true;
                validatorError.messages.push("Answers error");
            } else {
                answers.forEach((value) => {
                    if (!validator.validateIsStringValid(value.answer)) {
                        validatorError.error = true;
                        validatorError.messages.push("Answer is not valid");
                    }

                    if (typeof value.isCorrect !== "boolean") {
                        validatorError.error = true;
                        validatorError.messages.push("Answer has no correct status");
                    }
                });
            }

            if (!validator.validateIsStringValid(country)) {
                validatorError.error = true;
                validatorError.messages.push("Country is not valid");
            }

            if (validatorError.error) {
                let error = {
                    messages: validatorError.messages
                };

                return res.json({ error });
            }
            data.createQuestion(req.body.question, req.body.answers, req.body.country)
                .then(newQuestion => {
                    if (!newQuestion.answers) {
                        return;
                    }
                    return res.status(201).json({ "message": "Successfully created message." });
                })
                .catch(err => {
                    res.json(err);
                });
        }
    };
};