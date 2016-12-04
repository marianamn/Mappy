/* globals module */

module.exports = function(models) {
    let { Analytics } = models;

    return {
        createAnalytics(userAgent, arriveTimeStamp, cameFrom, pagesBeforeLogin, userId, loginTimeStamp, pagesAfterLogin, hasRegistered, registeredTimeStamp) {
            return new Promise((resolve, reject) => {

                let newAnalytics = new Analytics({
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
                Analytics.findById({ _id }, (err, userAnalytics) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(userAnalytics);
                });
            });
        }
    };
};