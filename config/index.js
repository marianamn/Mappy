/* globals module */

let port = process.env.PORT || 3001;
let connection = process.env.MONGODB_URI || "mongodb://localhost/mappyDb";

module.exports = {
    connectionString: connection,
    port: port
};