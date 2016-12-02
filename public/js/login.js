/* globals $ toastr requester location */
"use strict";

$("body").on("click", "#btn-login", () => {
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    let url = "/auth/login";
    requester.postJSON(url, user)
        .then((response) => {
            if (response.success) {
                toastr.success(response.message);
                $(location).attr("href", "/");
            } else {
                toastr.error(response.message);
            }
        });
});