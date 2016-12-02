/* globals $ requester toastr validator */
"use strict";

function validatIsInputValid(inputValue, valueName) {
    if (!validator.validateIsStringValid(inputValue)) {
        toastr.error(valueName + "is not valid");
        return Promise.reject();
    }
}

$("body").on("focus", "#question-country", function (ev) {
    requester.getJSON("/api/countries")
        .then(response => {
            var countries = response.countriesNames || [];
            var countriesNames = countries.map(c => c.name);
            $(ev.target).autocomplete({ source: countriesNames });
        });
});

$("body").on("click", "#createQuestion", () => {
    let $question = $("#question-title");

    let $firstA = $("#firstA");
    let $secondA = $("#secondA");
    let $thirdA = $("#thirdA");
    let $forthA = $("#forthA");

    let $radio1 = $("#radio1");
    let $radio2 = $("#radio2");
    let $radio3 = $("#radio3");
    let $radio4 = $("#radio4");

    let $country = $("#question-country");

    return new
        Promise((resolve, reject) => {

            if (!validator.validateIsStringValid($question.val())) {
                return reject({ message: "Question is not valid" });
            }

            if (!validator.validateIsStringValid($firstA.val())) {
                return reject({ message: "First answer is not valid" });
            }

            if (!validator.validateIsStringValid($secondA.val())) {
                return reject({ message: "Second answer is not valid" });
            }

            if (!validator.validateIsStringValid($thirdA.val())) {
                return reject({ message: "Third answer is not valid" });
            }

            if (!validator.validateIsStringValid($forthA.val())) {
                return reject({ message: "Forth answer is not valid" });
            }

            var isThereCorrectAnswer = false;

            if ($radio1.is(":checked") ||
                $radio2.is(":checked") ||
                $radio3.is(":checked") ||
                $radio4.is(":checked")) {
                isThereCorrectAnswer = true;
            }

            if (!isThereCorrectAnswer) {
                return reject({ message: "There is no correct answer" });
            }

            // return requester.getJSON("/api/countries");
            return resolve(requester.getJSON("/api/countries"));
        })
        .then(response => {
            var countries = response.countriesNames || [];
            var countriesNames = countries.map(c => c.name);
            var isvalidCountry = countriesNames.some(c => c === $.trim($country.val()));

            if (!isvalidCountry) {
                return Promise.reject({ message: "There is no such a country" });
            }

            let questionObj = {
                question: $question.val(),
                country: $country.val(),
                answers: [{
                    answer: $firstA.val(),
                    isCorrect: $radio1.is(":checked")
                },
                {
                    answer: $secondA.val(),
                    isCorrect: $radio2.is(":checked")
                },
                {
                    answer: $thirdA.val(),
                    isCorrect: $radio3.is(":checked")
                },
                {
                    answer: $forthA.val(),
                    isCorrect: $radio4.is(":checked")
                }
                ]
            };

            return requester.postJSON("/api/createQuestion", questionObj);
        })
        .then((success) => {
            toastr.success(success.message);

            $question.val("");
            $country.val("");

            $firstA.val("");
            $secondA.val("");
            $thirdA.val("");
            $forthA.val("");

            $radio1.prop("checked", false);
            $radio2.prop("checked", false);
            $radio3.prop("checked", false);
            $radio4.prop("checked", false);
        })
        .catch((err) => {
            console.log(err);
            toastr.error(err.message);
        });
});

$("body").on("click", ".country-item", (ev) => {
    $("#question-country").val($.trim($(ev.target).html()));
});