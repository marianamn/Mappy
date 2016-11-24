/* globals require, module, process */

let path = require("path");
let dbName = "testDb";

module.exports = {
    development: {
        rootPath: path.normalize(`${__dirname}/../../`),
        db: `mongodb://localhost:27017/${dbName}`,
        // port: process.env.PORT || 3000
        port: 3000
    }
};