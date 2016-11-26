/* globals require, module, process */

const RANDOM_BYTES_NUMBER = 128;

const crypto = require("crypto");

module.exports = {
    generateSalt() {
        return crypto.randomBytes(RANDOM_BYTES_NUMBER).toString("base64");
    },
    generateHashedPassword(salt, pwd) {
        let hmac = crypto.createHmac("sha1", salt);
        return hmac.update(pwd).digest("hex");
    }
};