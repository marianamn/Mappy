/* globals io $ */
var socket = io();
$("body").on("click", "#sendMsg", () => {
    let username = $("#currentUsername").text();
    let inputMsgValue = $("#m").val();
    let message = {
        username,
        inputMsgValue
    };

    socket.emit("chat message", message);
    $("#m").val("");
    return false;
});

socket.on("chat message", (msg) => {
    console.log(msg);
    let container = $("#message-container");
    let messageUser = $("<p />").addClass("text-muted").text(msg.username);
    let messageContent = $("<span />").text(msg.inputMsgValue);
    let message = $("<div />").addClass("row message-bubble");
    message.append(messageUser);
    message.append(messageContent);
    container.append(message);
});