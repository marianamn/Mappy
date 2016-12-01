/* globals $ requester toastr */
"use strict";

$("body").on("click", "#question-country", function(ev) {
    console.log('here');
    requester.getJSON("/api/countries")
        .then(response => {
            var countries = response.countriesNames;
            var countriesNames = countries.map(c => c.name);
            $(ev.target).autocomplete({ source: countriesNames });
        });
});

$("body").on("click", "#createQuestion", () => {
    let $question = $("#question-title");
    let $country = $("#question-country");

    let $firstA = $("#firstA");
    let $secondA = $("#secondA");
    let $thirdA = $("#thirdA");
    let $forthA = $("#forthA");

    let $radio1 = $("#radio1");
    let $radio2 = $("#radio2");
    let $radio3 = $("#radio3");
    let $radio4 = $("#radio4");

    requester.getJSON("/api/countries")
        .then(response => {
            var countriesNames = response.countriesNames;
            var isvalidCountry = countriesNames.some(c => c === $country.val());
            console.log(isvalidCountry);
            if (!isvalidCountry) {
                toastr.error("There is no such a country");
                return Promise.reject();
            }

            let questionObj = {
                question: $question.val(),
                country: $country.val(),
                answers: [
                    {
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
        .catch(() => {
            toastr.error("Something went wrong!");
        });
});

$("body").on("click", ".country-item", (ev) => {
    $("#question-country").val($.trim($(ev.target).html()));
});