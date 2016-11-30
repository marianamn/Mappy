/* globals $ toastr validator requester location */
"use strict";

// todo validate email and password length
// bug when user visits others user profile your profile image is shown
const userImgURLPattern = /:\/\//;

$("body").on("click", "#btn-register", () => {
    var confirmPassword = $("#confirmPassword").val();
    var registerObj = {
        username: $("#username").val(),
        password: $("#password").val(),
        email: $("#email").val(),
        profileImgURL: $("#profileImgURL").val(),
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val()
    };

    if (!validator.validateStringLength(registerObj.username, 3, 50)) {
        toastr.error("Error: Username must be between 3 and 50 symbols");
        return;
    }

    if (registerObj.password !== confirmPassword) {
        toastr.error("Error: Invalid password. Password and confirm password must be same");
        return;
    }

    if (!validator.validateStringLength(registerObj.firstName, 3, 50)) {
        toastr.error("Error: First name must be between 3 and 50 symbols");
        return;
    }

    if (!validator.validateStringLength(registerObj.lastName, 3, 50)) {
        toastr.error("Error: Last name must be between 3 and 50 symbols");
        return;
    }

    if (registerObj.profileImgURL && registerObj.profileImgURL !== "") {
        if (!userImgURLPattern.test(registerObj.profileImgURL)) {
            toastr.error("Error: Invalid image url");
            return;
        }
    }

    if (!registerObj.password) {
        toastr.error("Error: Password is required");
        return;
    }

    requester.postJSON("/api/register", registerObj)
        .then((response) => {
            if (response.message) {
                toastr.success(response.message);
            } else {
                toastr.error("User with that username already exists");
            }
        })
        .then(() => {
            $(location).attr("href", "/auth/login");
        })
        .catch(err => {
            toastr.error(err);
        });
});
