/* globals require, module*/

let UsersController = require("./usersController"),
    ProfileController = require("./profileController");

// add other controllers
module.exports = {
    users: UsersController,
    profiles: ProfileController
};