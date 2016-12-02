/* globals $ toastr validator requester */
"use strict";

$("body").on("click", "btn-login", () => {
    let user = {
        username: $("#username").val(),
        password: $("#password").val()
    };

    let url = "/api/login";
    requester.postJSON(url, user)
        .then((response) => {
            if (response.error) {
                toastr.error(response.error);
            } else {
                toastr.success(response);
            }
        });
});