/* globals io $ requester */

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = `${hours}:${minutes} ${ampm}`;
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${strTime}`;
}

let socket = io();
$("body").on("click", "#sendMsg", () => {
    let user = $("#currentUsername").text();
    let answer = $("#m").val();
    let datetime = formatDate(new Date());
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
    let messageDate = formatDate(new Date(msg.datetime));
    let container = $("#message-container");
    let messageUser = $("<p />")
        .addClass("text-muted")
        .text(msg.user);
    let messageContent = $("<span />")
        .text(msg.answer);
    let messageContentDate = $("<div />")
        .text(`sent ${messageDate}`);
    let message = $("<div />")
        .addClass("row message-bubble");
    message.append(messageUser);
    message.append(messageContent);
    message.append(messageContentDate);
    container.append(message);
});