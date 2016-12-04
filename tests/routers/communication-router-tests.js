/* globals require describe it beforeEach afterEach before after*/

const chai = require("chai");
const sinonModule = require("sinon");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
let expect = chai.expect;

describe("Test comunication router", () => {
    let sinon;

    let controllers = {
        home: () => {}
    };

    let middlewares = {
        analytics: () => {},
        isAdmin: () => {},
        isAuthenticated: () => {}
    };

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GET /communication/chat", () => {
        it("expect to get status 200 when request chat when user is authenticated", done => {
            sinon.stub(controllers, "home", (req, res) => {
                res.status(200).end();
            });

            sinon.stub(middlewares, "analytics", (req, res, next) => {
                return next();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/home-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        it("expect to get status 200 when request terms of use", done => {
            sinon.stub(middlewares, "analytics", (req, res, next) => {
                req.user = { username: "test" };
                return next();
            });

            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/home-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/terms")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });
    });
});