/* globals module */

module.exports = function(models) {
    let { Analytics } = models;

    return {
        createAnalytics(sessionData) {
            return new Promise((resolve, reject) => {
                let newAnalytics = new Analytics({
                    userAgent: sessionData.userAgent,
                    arriveTime: sessionData.arriveTime,
                    cameFrom: sessionData.cameFrom,
                    pagesBeforeLogin: sessionData.pagesBeforeLogin,
                    userId: sessionData.passport.user,
                    loginTime: sessionData.loginTime,
                    pagesAfterLogin: sessionData.pagesAfterLogin
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