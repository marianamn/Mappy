/* globals $ requester toastr */
"use strict";

$("body").on("click", "#createQuestion", () => {
    let questionObj = {
        question: $("#question-title").val(),
        country: $("#question-country").val(),
        answers: [
            {
                answer: $("#firstA").val(),
                isCorrect: $("#radio1").is(":checked")
            },
            {
                answer: $("#secondA").val(),
                isCorrect: $("#radio2").is(":checked")
            },
            {
                answer: $("#thirdA").val(),
                isCorrect: $("#radio3").is(":checked")
            },
            {
                answer: $("#forthA").val(),
                isCorrect: $("#radio4").is(":checked")
            }
        ]
    };

    requester.postJSON("/api/createQuestion", questionObj)
        .then((success) => {
            toastr.success(success.message);
        })
        .catch(() => {
            toastr.error("Something went wrong!");
        });
});