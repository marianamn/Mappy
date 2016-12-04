/* globals module */

let port = process.env.PORT || 3001;
let connection = process.env.MONGODB_URI || "mongodb://localhost/mappyDb";
let url = process.env.NODE_ENV || "http://localhost:3001";

module.exports = {
    rootUrl: url,
    connectionString: connection,
    port: port
};