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
            success: function (response) {
                resolve(response);
            },
            error: function () {

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
        
        let $list = $(".answers-item");
        let $currentLi = $list.eq(0);
        let count = 1;
        answers.forEach(answer => {
            $currentLi.find(".btn").html(answer);
            $currentLi = $list.eq(count);
            count += 1;
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
