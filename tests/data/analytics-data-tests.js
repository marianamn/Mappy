/* globals require describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test analytics data module", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Analytics {
        constructor(properties) {
            let userAgent = properties.userAgent;
            let arrived = properties.arriveTimeStamp;
            let cameFrom = properties.cameFrom;
            let pagesBeforeLogin = properties.pagesBeforeLogin;
            let user = properties.passport.user;
            let loginTime = properties.loginTimeStamp;
            let pagesAfterLogin = properties.pagesAfterLogin;
            let hasRegistered = properties.hasRegistered;
            let registeredTime = properties.registeredTimeStamp;

            this.userAgent = userAgent;
            this.arriveTimeStamp = arrived;
            this.cameFrom = cameFrom;
            this.pagesBeforeLogin = pagesBeforeLogin;
            this.userId = user;
            this.loginTimeStamp = loginTime;
            this.pagesAfterLogin = pagesAfterLogin;
            this.hasRegistered = hasRegistered;
            this.registeredTimeStamp = registeredTime;
        }

        save() {}

        static findOne() {}
        static findById() {}
    }

    let data = require("../../data/analytics-data")({ Analytics });

    describe("createAnalytics()", () => {
        let testSessionData = {
            userAgent: "test user agent",
            arriveTimeStamp: "test arrive time stamp",
            cameFrom: "testLastName",
            pagesBeforeLogin: ["page one", "page two", "page three"],
            passport: {
                user: "test user id"
            },
            loginTimeStamp: "test login time stamp",
            pagesAfterLogin: ["page four", "page five", "page six"],
            hasRegistered: true,
            registeredTimeStamp: "test registered time stamp"
        };

        let expectedAnalytics = new Analytics(testSessionData);

        beforeEach(() => {
            sinon.stub(Analytics.prototype, "save", cb => {
                cb(null, expectedAnalytics);
            });
        });

        describe("createAnalytics()", () => {
            afterEach(() => {
                sinon.restore();
            });
            it("Expect to get created analytics entry", done => {
                data.createAnalytics(testSessionData)
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });

            // it("Expect returned analytics not to be null", done => {
            //     data.createAnalytics(testSessionData)
            //         .then(resAnalytics => {

            //             expect(resAnalytics).not.to.be.eql(null);
            //             done();
            //         });
            // });
        });
    });

});