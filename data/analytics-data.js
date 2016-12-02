/* globals module */

module.exports = function(models) {
    let { Analytics } = models;

    return {
        createAnalytics(sessionData) {
            return new Promise((resolve, reject) => {
                let newAnalytics = new Analytics({
                    userAgent: sessionData.userAgent,
                    arriveTimeStamp: sessionData.arriveTimeStamp,
                    cameFrom: sessionData.cameFrom,
                    pagesBeforeLogin: sessionData.pagesBeforeLogin,
                    userId: sessionData.passport.user,
                    loginTimeStamp: sessionData.loginTimeStamp,
                    pagesAfterLogin: sessionData.pagesAfterLogin,
                    hasRegistered: sessionData.hasRegistered,
                    registeredTimeStamp: sessionData.registeredTimeStamp
                });

                newAnalytics.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newAnalytics);
                });
            });
        },
        getAllAnalyticsData() {
            return new Promise((resolve, reject) => {
                Analytics.find({}, (err, analytics) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(analytics);
                });
            });
        },
        getAnalyticsById(dataId) {
            let _id = dataId;
            return new Promise((resolve, reject) => {
                Analytics.findOne({ _id }, (err, userAnalytics) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(userAnalytics);
                });
            });
        }
    };
};