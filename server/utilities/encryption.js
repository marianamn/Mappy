/* globals require, module, process */

let crypto = require("crypto");

function generateSalt () {
    return crypto.randomBytes(128).toString("base64");
}

function generateHashedPassword (salt, pwd) {
    let hmac = crypto.createHmac("sha1", salt);
    return hmac.update(pwd).digest("hex");
}

module.exports = {
    generateSalt,
    generateHashedPassword
};