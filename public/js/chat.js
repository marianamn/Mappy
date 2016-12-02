/* globals io $ requester */

var socket = io();
$("body").on("click", "#sendMsg", () => {
    let user = $("#currentUsername").text();
    let answer = $("#m").val();
    let datetime = new Date();
    let message = {
        user,
        answer,
        datetime
    };
    var url = "/api/chat";
    requester.postJSON(url, message)
        .then((chatAnswer) => {
            socket.emit("chat message", chatAnswer);
            $("#m").val("");
            return false;
        });

});

socket.on("chat message", (msg) => {
    console.log(msg);
    let container = $("#message-container");
    let messageUser = $("<p />")
        .addClass("text-muted")
        .text(msg.user);
    let messageContent = $("<span />")
        .text(msg.datetime + " " + msg.answer);
    let message = $("<div />")
        .addClass("row message-bubble");
    message.append(messageUser);
    message.append(messageContent);
    container.append(message);
});