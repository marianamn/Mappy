/* globals require describe it beforeEach afterEach before after*/

const chai = require("chai");
const sinonModule = require("sinon");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
let expect = chai.expect;

describe("Test admin router", () => {
    let sinon;

    let controllers = {
        getPanel: () => {},
        getCreateQuestionForm: () => {},
        getAllAnalytics: () => {},
        getAllAnalyticsPerUser: () => {}
    };

    let middlewares = {
        isAdmin: () => {},
        isAuthenticated: () => {}
    };

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GET /panel", () => {
        it("expect to admin getPanel to respond with 200 OK if user is admin", done => {
            sinon.stub(controllers, "getPanel", (req, res) => {
                res.status(200).end();
            });

            sinon.stub(middlewares, "isAdmin", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        it("expect to admin getPanel to respond with 403 if user is not authenticated", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res) => {
                res.status(403).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel")
                .end((req, res) => {
                    expect(res.status).equals(403);
                    done();
                });
        });

        it("expect to admin getPanel to respond with 401 if user is authenticated but not admin", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAdmin", (req, res, next) => {
                res.status(401).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel")
                .end((req, res) => {
                    expect(res.status).equals(401);
                    done();
                });
        });
    });

    describe("GET /panel/createQuestion", () => {
        it("expect to admin getCreateQuestionForm to respond with 200 OK if user is admin", done => {
            sinon.stub(controllers, "getCreateQuestionForm", (req, res) => {
                res.status(200).end();
            });

            sinon.stub(middlewares, "isAdmin", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/createQuestion")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        it("expect to admin getCreateQuestionForm to respond with 403 if user is not authenticated", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res) => {
                res.status(403).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/createQuestion")
                .end((req, res) => {
                    expect(res.status).equals(403);
                    done();
                });
        });

        it("expect to admin getCreateQuestionForm to respond with 401 if user is authenticated, but not admin", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAdmin", (req, res) => {
                res.status(401).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/createQuestion")
                .end((req, res) => {
                    expect(res.status).equals(401);
                    done();
                });
        });
    });

    describe("GET /panel/analytics", () => {
        it("expect to admin getAllAnalytics to respond with 200 OK if user is admin", done => {
            sinon.stub(controllers, "getAllAnalytics", (req, res) => {
                res.status(200).end();
            });

            sinon.stub(middlewares, "isAdmin", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/analytics")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        it("expect to admin getAllAnalytics to respond with 403 if user is not authenticated", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res) => {
                res.status(403).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/analytics")
                .end((req, res) => {
                    expect(res.status).equals(403);
                    done();
                });
        });

        it("expect to admin getAllAnalytics to respond with 401 if user is authenticated, but not admin", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAdmin", (req, res) => {
                res.status(401).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/analytics")
                .end((req, res) => {
                    expect(res.status).equals(401);
                    done();
                });
        });
    });

    describe("GET /panel/analytics/user/:dataId", () => {
        it("expect to admin getAllAnalyticsPerUser to respond with 200 OK if user is admin", done => {
            sinon.stub(controllers, "getAllAnalyticsPerUser", (req, res) => {
                res.status(200).end();
            });

            sinon.stub(middlewares, "isAdmin", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/analytics/user/:dataId")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        it("expect to admin getAllAnalyticsPerUser to respond with 403 if user is not authenticated", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res) => {
                res.status(403).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/analytics/user/:dataId")
                .end((req, res) => {
                    expect(res.status).equals(403);
                    done();
                });
        });

        it("expect to admin getAllAnalyticsPerUser to respond with 401 if user is authenticated, but not admin", done => {
            sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
                return next();
            });

            sinon.stub(middlewares, "isAdmin", (req, res) => {
                res.status(401).end();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel/analytics/user/:dataId")
                .end((req, res) => {
                    expect(res.status).equals(401);
                    done();
                });
        });
    });
});