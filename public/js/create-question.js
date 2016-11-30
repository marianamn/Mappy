/* globals $ requester toastr */
"use strict";

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

    requester.postJSON("/api/createQuestion", questionObj)
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