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
            this.userId = properties.userId;
            this.loginTimeStamp = properties.loginTimeStamp;
            this.pagesAfterLogin = properties.pagesAfterLogin;
            this.hasRegistered = properties.hasRegistered;
            this.registeredTimeStamp = properties.registeredTimeStamp;
        }

        save() {}

        static find() {}
        static findOne() {}
        static findById() {}
    }

    let data = require("../../data/analytics-data")({ Analytics });

    describe("createAnalytics()", () => {

        let userAgent = "test user agent string";
        let arriveTimeStamp = "test arrive time stamp";
        let cameFrom = "testLastName";
        let pagesBeforeLogin = ["page one", "page two", "page three"];
        let userId = "test user id";
        let loginTimeStamp = "test login time stamp";
        let pagesAfterLogin = ["page four", "page five", "page six"];
        let hasRegistered = true;
        let registeredTimeStamp = "test registered time stamp";

        let expectedAnalytics = new Analytics({
            userAgent,
            arriveTimeStamp,
            cameFrom,
            pagesBeforeLogin,
            userId,
            loginTimeStamp,
            pagesAfterLogin,
            hasRegistered,
            registeredTimeStamp
        });

        beforeEach(() => {
            sinon.stub(Analytics.prototype, "save", cb => {
                cb(null, expectedAnalytics);
            });
        });

        afterEach(() => {
            sinon.restore();
        });
        it("Expect to get created analytics entry", done => {
            data.createAnalytics(
                    userAgent,
                    arriveTimeStamp,
                    cameFrom,
                    pagesBeforeLogin,
                    userId,
                    loginTimeStamp,
                    pagesAfterLogin,
                    hasRegistered,
                    registeredTimeStamp)
                .then(resAnalytics => {
                    expect(resAnalytics).to.be.eql(expectedAnalytics);
                    done();
                });
        });

        it("Expect returned analytics not to be null", done => {
            data.createAnalytics(
                    userAgent,
                    arriveTimeStamp,
                    cameFrom,
                    pagesBeforeLogin,
                    userId,
                    loginTimeStamp,
                    pagesAfterLogin,
                    hasRegistered,
                    registeredTimeStamp)
                .then(resAnalytics => {

                    expect(resAnalytics).not.to.be.eql(null);
                    done();
                });
        });
    });

    describe("getAllAnalyticsData()", () => {

        let expected1 = {
            id: 1
        };

        let expected2 = {
            id: 2
        };

        let allanalytics = [expected1, expected2];

        beforeEach(() => {
            sinon.stub(Analytics, "find").yields(null, allanalytics);
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect found analytics data to have length 2", done => {
            data.getAllAnalyticsData()
                .then(result => {
                    expect(result.length).to.be.equal(allanalytics.length);
                    done();
                });
        });
    });
});