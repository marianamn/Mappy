/* globals require describe it beforeEach afterEach before after*/

const chai = require("chai");
const sinonModule = require("sinon");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
let expect = chai.expect;

describe("Test fractions router", () => {
    let sinon;

    let controller = {
        getPanel: (req, res) => { },
        getCreateQuestionForm: (req, res) => { },
        getAllAnalytics: (req, res) => { },
        getAllAnalyticsPerUser: (req, res) => { }
    };

    let sampleUser = {
        username: "John",
        isAdmin: true
    };

    let controllers = {
        getPanel: controller.getPanel,
        getCreateQuestionForm: controller.getCreateQuestionForm,
        getAllAnalytics: controller.getAllAnalytics,
        getAllAnalyticsPerUser: controller.getAllAnalyticsPerUser
    };

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(controller, "getPanel", (req, res) => {
            res.status(200).render("admin/panel", {
                user: sampleUser
            });
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GET /panel", () => {
        it("expect to admin getPanel to respond with 200 OK", done => {
            let appConfig = require("../../config/application")({ data: {} });
            let app = appConfig.app;
            require("../../routers/admin-router")({ app, controllers });
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