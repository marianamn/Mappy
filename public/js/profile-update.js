/* globals $ requester toastr validator */
"use strict";

function escapeHtmlTags(str) {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

const userImgURLPattern = /:\/\//;

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
            profileImgURL: profileImage
        };
    } else {
        profileObj = {
            id: $("#username").attr("id-data"),
            email: $("#email").val(),
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            profileImgURL: profileImage
        };
    }

    if (!validator.validateStringLength(profileObj.firstName, 3, 50)) {
        toastr.error("Error: First name must be between 3 and 50 symbols");
        return;
    }

    if (!validator.validateStringLength(profileObj.lastName, 3, 50)) {
        toastr.error("Error: Last name must be between 3 and 50 symbols");
        return;
    }

    if (!userImgURLPattern.test(profileObj.profileImgURL)) {
        toastr.error("Error: Invalid image url");
        return;
    }

    requester.putJSON("/api/profile", profileObj)
        .then((success) => {
            toastr.success(success.message);
            $("#password").val("");
            $("#confirmPassword").val("");
        })
        .catch((err) => {
            toastr.error(err.message);
        });
});