/* globals require console */

const config = require("./config");
const validator = require("./utils/validator");

let data = require("./data")(config.connectionString, validator);

let controllers = require("./controllers")({ data, validator });

let { app, server } = require("./config/application")({ data });

let io = require("./config/socket")({ server, data });

require("./routers")({ app, data, controllers });

server.listen(config.port, () => console.log(`Mappy running at: ${config.port}`));