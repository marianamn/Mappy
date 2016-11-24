/* globals require*/

let auth = require("./auth"),
    controllers = require("../controllers");

module.exports = function(app) {
    app.get("/register", controllers.users.getRegister);
    app.post("/register", controllers.users.postRegister);

    app.post("/login", auth.login);
    app.get("/logout", auth.logout);
    app.get("/login", controllers.users.getLogin);

    app.get("/profile", auth.isAuthenticated, controllers.profiles.getProfile);
    app.post("/profile", auth.isAuthenticated, controllers.profiles.postProfile);

    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("*", (req, res) => {
        res.render("index");
    });
};