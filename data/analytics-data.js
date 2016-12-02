/* globals module */

module.exports = function(models) {
    let { Analytics } = models;

    return {
        createAnalytics(sessionData) {
            return new Promise((resolve, reject) => {
                let newAnalytics = new Analytics({
                    userAgent: sessionData.userAgent,
                    arriveTime: sessionData.arriveTimeStamp,
                    cameFrom: sessionData.cameFrom,
                    pagesBeforeLogin: sessionData.pagesBeforeLogin,
                    userId: sessionData.passport.user,
                    loginTime: sessionData.loginTimeStamp,
                    pagesAfterLogin: sessionData.pagesAfterLogin,
                    hasRegistered: sessionData.hasRegistered
                });

                newAnalytics.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newAnalytics);
                });
            });
        }
    };
};