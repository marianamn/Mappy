/* globals $ requester toastr */

$("#username").on("click", function (ev) {
    requester.getJSON("/api/users")
        .then(users => {
            $(ev.target).autocomplete({ source: users });
        });
});

$("#modify").on("click", function (ev) {
    ev.preventDefault();
    var $username = $("#username");

    var username = $username.val();
    var isAdmin = $("#admin-user").is(":checked");
    var isNormalUser = $("#normal-user").is(":checked");

    if (!isAdmin && !isNormalUser) {
        toastr.error("No role is selected");
        return;
    }

    if (!username) {
        toastr.error("No user in the input field");
        return;
    }

    var body = { isAdmin };
    var url = "/api/users/" + username;
    requester.putJSON(url, body)
        .then((response) => {
            if (response.error) {
                console.log(response.error);
                toastr.error(response.error);
            } else {
                toastr.success(response.message);
            }
            $username.val("");
            $("admin-user").prop("checked", false);
            $("normal-user").prop("checked", false);
        });
});