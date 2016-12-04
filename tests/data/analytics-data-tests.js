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
            this.userAgent = properties.userAgent;
            this.arriveTimeStamp = properties.arriveTimeStamp;
            this.cameFrom = properties.cameFrom;
            this.pagesBeforeLogin = properties.pagesBeforeLogin;
            this.userId = properties.passport.user;
            this.loginTimeStamp = properties.loginTimeStamp;
            this.pagesAfterLogin = properties.pagesAfterLogin;
            this.hasRegistered = properties.hasRegistered;
            this.registeredTimeStamp = properties.registeredTimeStamp;
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
                    .then(resAnalytics => {
                        expect(resAnalytics).to.be.eql(expectedAnalytics);
                        done();
                    })
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