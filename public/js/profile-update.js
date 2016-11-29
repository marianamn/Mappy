/* globals $ requester toastr */
"use strict";

function escapeHtmlTags(str) {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

$("body").on("click", "#save-changes", () => {
    let profileImage = $("#profileImg").val();
    if (!profileImage) {
        profileImage = $("#defaultProfileImg").val();
    }

    let profileObj;

    if ($("#password").val() && $("#password").val() === $("#confirmPassword").val()) {
        profileObj = {
            id: $("#username").attr("id-data"),
            password: $("#password").val(),
            email: $("#email").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            profileImageUrl: profileImage
        };
    } else {
        profileObj = {
            id: $("#username").attr("id-data"),
            email: $("#email").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            profileImageUrl: profileImage
        };
    }

    requester.putJSON("/api/profile", profileObj)
        .then((success) => {
            toastr.success(success.message);
            $("#password").val("");
            $("#confirmPassword").val("");
        })
        .catch((err) => {
            console.log(err);
            toastr.error("Something went wrong");
        });
});

$("body").on("click", "#add-comment", () => {
    let $commentInput = $("#comment");
    let commentToAdd = $commentInput.val();
    commentToAdd = escapeHtmlTags(commentToAdd);

    let usernameToAddComment = $("#username").val();
    let url = `/api/users/${usernameToAddComment}/comments`;

    requester.postJSON(url, { commentToAdd })
        .then((response) => {
            if (response.error) {
                toastr.error(response.message);
            } else {
                toastr.success(response.message);
            }
            $commentInput.val("");
        })
        .catch((err) => {
            toastr.error(err.message);
        });
});