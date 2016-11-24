/* globals require, module, process */

let path = require("path");
let dbName = "mappyDb";

module.exports = {
    development: {
        rootPath: path.normalize(`${__dirname}/../../`),
        db: `mongodb://localhost:27017/${dbName}`,
        // port: process.env.PORT || 3000
        port: 3000
    }
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "magic unicorns", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${config.rootPath}/public`));

app.use((req, res, next) => {
    if (req.session.error) {
        let msg = req.session.error;
        req.session.error = undefined;
        app.locals.errorMessage = msg;
    } else {
        app.locals.errorMessage = undefined;
    }

    next();
});

app.use((req, res, next) => {
    if (req.user) {
        app.locals.currentUser = req.user;
    } else {
        app.locals.currentUser = undefined;
    }

    next();
});
};      });
    });
};