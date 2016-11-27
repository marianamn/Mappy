/* globals $ */

$("body").on("click", ".btn", (ev) => {
    let $target = $(ev.target);
    let choosedAnswer = $target.html();
    let questionId = $(".question").eq(0)
        .attr("id");

    let body = { choosedAnswer, questionId };

    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/api/evaluate",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(body),
            success: function (response) {
                resolve(response);
            },
            error: function () {

            }
        });
    }).then(response => {
        console.log(response);
    });

});