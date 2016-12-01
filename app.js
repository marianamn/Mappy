/* globals require console */

const config = require("./config");
const validator = require("./utils/validator");

let data = require("./data")(config.connectionString, validator);

let controllers = require("./controllers")(data);

const app = require("./config/application")({ data });

require("./config/chat-socket")({ app });
require("./routers")({ app, data, controllers });

app.listen(config.port, () => console.log(`Mappy running at: ${config.port}`));