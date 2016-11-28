/* globals $ requester toastr */
"use strict";

$("body").on("click", "#save-changes", () => {
    let profileImage = $("#profileImg").val();
    if (!profileImage) {
        profileImage = $("#defaultProfileImg").val()
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