/* globals require describe it beforeEach afterEach before after*/

const chai = require("chai");
const sinonModule = require("sinon");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
let expect = chai.expect;

describe("Test fractions router", () => {
    let sinon;

    let controllers = {
        getPanel: () => { },
        getCreateQuestionForm: () => { },
        getAllAnalytics: () => { },
        getAllAnalyticsPerUser: () => { }
    };

    let middlewares = {
        isAdmin: () => {},
        isAuthenticated: () => {}
    };

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(controllers, "getPanel", (req, res) => {
            res.status(200).end();
        });

        sinon.stub(middlewares, "isAdmin", (req, res, next) => {
            return next();
        });

        sinon.stub(middlewares, "isAuthenticated", (req, res, next) => {
            return next();
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GET /panel", () => {
        it("expect to admin getPanel to respond with 200 OK", done => {
            let { app } = require("../../config/application")({ data: {} });
            require("../../routers/admin-router")({ app, controllers, middlewares });

            chai.request(app)
                .get("/admin/panel")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });
    });

    // describe("GET /fractions/:id", () => {
    //     it("Valid ID", done => {
    //         let app = require("../../config/application")({ data: {} });
    //         require("../../routers/fractions-router")({ app, controllers });

    //         chai.request(app)
    //             .get("/fractions/1")
    //             .end((req, res) => {
    //                 expect(res.status).equals(200);
    //                 done();
    //             });
    //     });
    // });
});