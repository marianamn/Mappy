/* globals require console */

const config = require("./config");

let data = require("./data")(config.connectionString);

let controllers = require("./controllers")(data);

const app = require("./config/application")({ data });

require("./routers")({ app, data, controllers });

app.listen(config.port, () => console.log(`Mappy running at: ${config.port}`));