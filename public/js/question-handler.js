/* globals $ toastr*/

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
            success: function(response) {
                resolve(response);
            },
            error: function() {

            }
        });
    }).then(response => {
        if (response.isCorrect) {
            toastr.success("Correct");
        } else {
            toastr.error("Wrong answer");
        }

        $(".question").eq(0)
            .html(response.newQuestion.question)
            .attr("id", response.newQuestion.id);

        let answers = response.newQuestion.answers;
        shuffle(answers);
        let $currentLi = $(".answers-item").eq(0);

        answers.forEach(answer => {
            $currentLi.find(".btn").html(answer);
            $currentLi = $currentLi.next();
        });

    })
        .catch(err => {
            console.log(err);
        });

});

function shuffle(array) {
    for (let i = array.length; i; i -= 1) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}
