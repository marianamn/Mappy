/* globals $ requester */

$("#search-input").on("click", function(ev) {
    requester.getJSON("/api/users")
        .then(users => {
            $(ev.target).autocomplete({ source: users });
        });
});